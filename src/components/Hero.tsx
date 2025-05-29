import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full py-10">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl">
          Free AI Prompt Generator
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl">
          Create powerful, effective prompts for ChatGPT with just an click
        </p>
        <div className="mt-5 hover:scale-105 transition-all duration-200">
          {/* <a
            href="https://www.producthunt.com/products/better-prompt?utm_source=badge-follow&utm_medium=badge&utm_source=badge-better&#0045;prompt"
            target="_blank"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=1065968&theme=light"
              alt="Better&#0032;Prompt&#0032; - Smarter&#0032;prompts&#0046;&#0032;Better&#0032;results&#0046; | Product Hunt"
              width="200"
              height="50"
            />
          </a> */}

          <a
            href="https://www.producthunt.com/posts/betterprompt-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-betterprompt&#0045;2"
            target="_blank"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=966449&theme=light&t=1747815116848"
              alt="BetterPrompt&#0032; - Smarter&#0032;prompts&#0046;&#0032;Better&#0032;results&#0046; | Product Hunt"
              width="180"
              height="45"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
