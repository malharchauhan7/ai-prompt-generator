import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full py-14">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl">
          Free AI Prompt Generator
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl">
          Create powerful, effective prompts for ChatGPT or any AI agents with
          just an click
        </p>
      </div>
    </div>
  );
};

export default Hero;
