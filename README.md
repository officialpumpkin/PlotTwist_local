# PlotTwist Local Dev

## 🚀 How to Start the App

1.  **Start the Server**:
    Open your terminal in the project root and run:
    ```bash
    npm run dev
    ```

2.  **Access the App**:
    Open your browser and navigate to:
    **http://localhost:8080**

## 📝 Recent Changes (Dec 12, 2025)

We've made significant updates to the landing page and development environment:

### 1. Environment & Setup
- Fixed the `npm run dev` script to support Windows environments using `cross-env`.

### 2. Landing Page Redesign
- **Hero Section**: Completely revamped with a modern split layout, dynamic visuals, and polished typography.
- **Dynamic Story Card**: The hero section now fetches a random story from your local database on every load.
  - Includes a loading skeleton to prevent content flashing.
  - Falls back to "The Midnight Library" if no stories are available.
- **How It Works**: Updated to a clear, step-by-step flow with improved visuals.
- **Testimonials**: Restyled the "Creative Collaboration" section while preserving the original satirical content.
- **Branding**: Restored "PlotTwist" branding in the hero tag.
- **UX**: Improved contrast on the "Read Stories" button for better readability.

## 🛠 Next Steps
- The server is ready. Run `npm run dev` to get started.
- You can explore the code in `client/src/pages/home.tsx` to see the new landing page logic.
- Continue building features or refining the UI!
- Note that the working documents for AI-DEV-TASKS are in the project folder ready for the next feature.


