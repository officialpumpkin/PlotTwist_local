import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import "./db"; // This initializes the DB connection we just fixed
import { setupHealthCheck } from "./health";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();

// CORS: Allow both your Cloudflare URL AND localhost (for local testing)
app.use(cors({
  origin: [
    "https://dc1ac165.plottwist-client.pages.dev", 
    "http://localhost:5173", 
    "http://localhost:3000"
  ], 
  credentials: true,
}));

// Use the port from env or default to 8080
const port = Number(process.env.PORT) || 8080;

// Trust proxy for session cookies (important if behind a load balancer like Cloud Run)
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup routes
(async () => {
  const server = await registerRoutes(app);

  // Global Error Logging
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const errorDetails = { message, status, stack: err.stack };
    
    console.error("Server Error:", errorDetails);

    // File logging (Safe for Cloud Run/Serverless using /tmp)
    try {
      const logsDir = path.join('/tmp', 'logs');
      if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
      
      const logFile = path.join(logsDir, `error-${new Date().toISOString().split('T')[0]}.log`);
      fs.appendFileSync(logFile, JSON.stringify(errorDetails) + '\n');
    } catch (_) {
      // Ignore file logging errors (common in read-only environments)
    }

    res.status(status).json(errorDetails);
  });

  setupHealthCheck(app);

  // Setup Vite or Static files
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Start Server
  server.listen({
    port,
    host: "0.0.0.0",
  }, () => {
    log(`serving on port ${port}`);
  });
})();