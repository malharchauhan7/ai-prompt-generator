
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface PromptResult {
  id: string;
  text: string;
}

const PromptGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<PromptResult[]>([]);

  const generatePrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt description");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Generate a simple transformation of the input prompt as demo
      // In a real app, this would be an API call to a backend service
      const generatedPrompt = generateSamplePrompt(prompt);
      
      const newResult = {
        id: Date.now().toString(),
        text: generatedPrompt
      };
      
      setResults(prev => [newResult, ...prev]);
      toast.success("Prompt generated successfully!");
    } catch (error) {
      console.error("Error generating prompt:", error);
      toast.error("Failed to generate prompt");
    } finally {
      setIsLoading(false);
    }
  };
  
  const generateSamplePrompt = (input: string) => {
    // This is a simple transformation just for demo purposes
    // In a real implementation, this would be replaced by an actual API call
    const templates = [
      `Create a comprehensive guide on ${input} that includes detailed explanations, examples, and best practices.`,
      `I need an expert-level analysis of ${input} covering all major aspects and potential applications.`,
      `Act as a specialist in ${input} and provide a step-by-step tutorial on how to implement this concept.`,
      `Generate a detailed comparison between different approaches to ${input}, highlighting strengths and weaknesses of each.`,
      `Write a prompt that asks for a creative solution to problems related to ${input} with specific constraints and requirements.`,
    ];
    
    // Randomly select one template
    return templates[Math.floor(Math.random() * templates.length)];
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col space-y-4">
        <div className="space-y-3">
          <Textarea
            placeholder="Describe what kind of prompt you want to generate..."
            className="min-h-[100px] bg-surface/30 border-surface text-foreground placeholder:text-muted-foreground text-sm"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button 
            className="w-full sm:w-auto sm:ml-auto sm:flex bg-accent hover:bg-accent/80 text-accent-foreground text-sm py-1.5 px-4 h-8"
            onClick={generatePrompt}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Prompt"}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-4 mt-2">
            <h2 className="text-lg font-semibold text-foreground">Generated Prompts</h2>
            <div className="space-y-3">
              {results.map((result) => (
                <div 
                  key={result.id} 
                  className="p-3 rounded-lg glass-effect animate-fade-in"
                >
                  <p className="text-foreground text-sm">{result.text}</p>
                  <div className="flex justify-end mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground hover:text-accent h-6"
                      onClick={() => {
                        navigator.clipboard.writeText(result.text);
                        toast.success("Copied to clipboard!");
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptGenerator;
