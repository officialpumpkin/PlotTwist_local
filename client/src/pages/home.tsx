import { Button } from "@/components/ui/button";
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginOptions from "@/components/LoginOptions";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [heroStory, setHeroStory] = useState<any>(null);

  const { data: stories, isLoading: isStoriesLoading } = useQuery({
    queryKey: ["/api/stories"],
  });

  useEffect(() => {
    if (stories && stories.length > 0) {
      // Pick a random story that has a description
      const validStories = stories.filter((s: any) => s.description && s.description.length > 20);
      if (validStories.length > 0) {
        const randomStory = validStories[Math.floor(Math.random() * validStories.length)];
        setHeroStory(randomStory);
      }
    }
  }, [stories]);
  
  // Show loading while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // Redirect authenticated users to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  const openLoginOptions = () => {
    setShowLoginOptions(true);
  };
  
  return (
    <div className="min-h-screen bg-neutral-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 z-10">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 mb-2 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full border border-neutral-200">
                <span className="text-sm font-medium text-neutral-600">PlotTwist | The Collaborative Storytelling Platform</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 leading-tight tracking-tight">
                Weave stories <br />
                <span className="text-primary relative">
                  together
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-xl text-neutral-600 max-w-lg leading-relaxed">
                Create unpredictable narratives with friends. One turn, one twist at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all" onClick={openLoginOptions}>
                  Start Writing
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base border-neutral-300 text-neutral-800 hover:bg-neutral-100 hover:text-neutral-900 bg-white/80 backdrop-blur-sm" asChild>
                  <Link to="/explore">
                    Read Stories
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block">
              {isStoriesLoading ? (
                <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 border border-neutral-100 min-h-[200px] animate-pulse">
                  <div className="flex items-center gap-3 mb-4 border-b border-neutral-100 pb-4">
                    <div className="w-10 h-10 rounded-full bg-neutral-200"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-neutral-200 rounded w-24"></div>
                      <div className="h-3 bg-neutral-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-neutral-200 rounded w-full"></div>
                    <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
                    <div className="h-4 bg-neutral-200 rounded w-4/6"></div>
                  </div>
                </div>
              ) : (
                <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 border border-neutral-100 rotate-2 transform hover:rotate-0 transition-all duration-500 min-h-[200px]">
                  <div className="flex items-center gap-3 mb-4 border-b border-neutral-100 pb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      {heroStory ? heroStory.title.charAt(0).toUpperCase() : "PS"}
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">
                        {heroStory ? heroStory.title : "The Midnight Library"}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {heroStory ? `Last edited ${new Date(heroStory.updatedAt).toLocaleDateString()}` : "Last edited just now"}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 font-serif text-lg leading-relaxed text-neutral-700">
                    <p>
                      {heroStory ? heroStory.description : "The library was silent, save for the rhythmic dripping of a faucet somewhere in the dark..."}
                    </p>
                    <div className="h-4 w-3/4 bg-neutral-100 rounded animate-pulse" />
                  </div>
                </div>
              )}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>
          </div>
            
            <Dialog open={showLoginOptions} onOpenChange={setShowLoginOptions}>
              <DialogContent 
                className="sm:max-w-md"
                aria-describedby="login-options-description"
              >
                <div className="sr-only" id="login-options-description">
                  Choose your login method to access PlotTwist
                </div>
                <LoginOptions />
              </DialogContent>
            </Dialog>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">How It Works</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Collaborative storytelling doesn't have to be complicated. We've made it simple to start, write, and share.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition duration-500 blur"></div>
              <div className="relative bg-neutral-50 p-8 rounded-2xl h-full border border-neutral-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="w-14 h-14 bg-white shadow-sm text-primary rounded-2xl flex items-center justify-center mb-6 text-2xl font-bold border border-neutral-100">
                  1
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Create a Story</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Start a new narrative, set the rules, and invite your friends. You decide the genre, word limits, and who gets to join the fun.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-10 transition duration-500 blur"></div>
              <div className="relative bg-neutral-50 p-8 rounded-2xl h-full border border-neutral-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="w-14 h-14 bg-white shadow-sm text-primary rounded-2xl flex items-center justify-center mb-6 text-2xl font-bold border border-neutral-100">
                  2
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Take Turns</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Watch the story unfold as each contributor adds their piece. Pass the digital pen and see where the collective imagination leads.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-2xl opacity-0 group-hover:opacity-10 transition duration-500 blur"></div>
              <div className="relative bg-neutral-50 p-8 rounded-2xl h-full border border-neutral-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="w-14 h-14 bg-white shadow-sm text-primary rounded-2xl flex items-center justify-center mb-6 text-2xl font-bold border border-neutral-100">
                  3
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Publish & Print</h3>
                <p className="text-neutral-600 leading-relaxed">
                  When the story is complete, publish it to the community or order a printed copy as a unique keepsake of your collaboration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-20 bg-neutral-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Creative Collaboration</h2>
            <p className="text-lg text-neutral-600">
              See how other real totally not made up people are using PlotTwist
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <h3 className="text-xl font-medium text-neutral-900 mb-4 leading-snug">
                "Our book club uses PlotTwist, specifically the erotic fiction function, between meetings to keep our creative juices flowing."
              </h3>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">SL</div>
                <div>
                  <div className="font-semibold text-neutral-900">Sarah L.</div>
                  <div className="text-sm text-neutral-500">Fake Book Club Organiser and Casual Testimonial Enthusiast</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <h3 className="text-xl font-medium text-neutral-900 mb-4 leading-snug">
                "My creative writing students collaborate on stories to learn about narrative structure and voice."
              </h3>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">JW</div>
                <div>
                  <div className="font-semibold text-neutral-900">Professor James W.</div>
                  <div className="text-sm text-neutral-500">Paid Literature Department Influencer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to weave your story?</h2>
          <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
            Join a community of writers, friends, and dreamers. Your next great story is just one turn away.
          </p>
          <Button
            size="lg"
            className="h-14 px-10 text-lg bg-white text-neutral-900 hover:bg-neutral-100 font-semibold rounded-full transition-all hover:scale-105"
            onClick={openLoginOptions}
          >
            Start Writing for Free
          </Button>
          <p className="mt-6 text-sm text-neutral-500">No credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-neutral-800 text-neutral-300">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 7 7.11 15.81"></path>
                <path d="M17 7v10H7V7"></path>
                <path d="M5 3a2 2 0 0 0-2 2"></path>
                <path d="M12 3h9a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"></path>
                <path d="M12 21H3a2 2 0 0 1-2-2V5"></path>
              </svg>
              <span className="text-lg font-bold">PlotTwist</span>
            </div>
            <div className="text-sm">
              © {new Date().getFullYear()} PlotTwist. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

