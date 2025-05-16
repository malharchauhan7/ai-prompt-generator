import React from "react";
import Hero from "@/components/Hero";
import PromptGenerator from "@/components/PromptGenerator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="w-full py-4 px-3 md:px-8 border-b border-border">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex gap-1 justify-center items-center">
            <img
              src="https://ik.imagekit.io/zh57cbpyz/ProjectImages/BetterPromptLogo.png?updatedAt=1747417890117"
              alt=""
              className="w-9 mt-1"
            />
            <h2 className="text-xl font-semibold bg-clip-text font-sans">
              BetterPrompt
            </h2>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container max-w-7xl mx-auto px-4 md:px-8">
          <Hero />

          <div className="py-12">
            <PromptGenerator />
          </div>
        </section>
      </main>

      {/* <footer className="w-full py-6 px-4 md:px-8 border-t border-border">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BetterPrompt. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a
                href="https://www.malhar.fun/"
                target="_blank"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                By Malhar
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default Index;
