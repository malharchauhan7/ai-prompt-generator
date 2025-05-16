import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { generateEnhancedPrompt } from "@/utils/api/generateEnhancedPrompt";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

interface PromptResult {
  id: string;
  text: string;
  timestamp?: number;
}

const PromptGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<PromptResult[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("generatedPrompts");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("generatedPrompts", JSON.stringify(results));
  }, [results]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt description");
      return;
    }

    setIsLoading(true);

    try {
      const response = await generateEnhancedPrompt(prompt);

      const newResult: PromptResult = {
        id: Date.now().toString(),
        text: response,
        timestamp: Date.now(),
      };

      setResults((prev) => [newResult, ...prev]);
      setPrompt(""); // Clear input after successful generation
      toast.success("Prompt generated successfully!");
    } catch (err) {
      console.error("Prompt generation error:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to generate prompt"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderMarkdown = (text: string) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-xl font-bold mb-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-lg font-semibold mt-4 mb-2" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc pl-6 mb-4" {...props} />
        ),
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        p: ({ node, ...props }) => <p className="mb-4" {...props} />,
      }}
    >
      {text}
    </ReactMarkdown>
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="space-y-4">
        {/* Input Area */}
        <div className="space-y-3">
          <Textarea
            placeholder="Enter your prompt description..."
            className="min-h-[100px] w-full bg-surface/30 border-surface text-foreground placeholder:text-muted-foreground text-sm"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex w-full sm:justify-end">
            <Button
              className="w-full sm:w-auto bg-accent hover:bg-accent/80 text-accent-foreground text-sm py-1.5 px-4 h-8"
              onClick={handleGenerate}
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Prompt"}
            </Button>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4 mt-4">
            <h2 className="text-lg font-semibold text-foreground">
              Generated Prompts
            </h2>

            {results.map((result) => (
              <div
                key={result.id}
                className="p-5 rounded-lg glass-effect animate-fade-in"
              >
                <div className="flex justify-end mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground h-6"
                    onClick={() => {
                      navigator.clipboard.writeText(result.text);
                      toast.success("Copied to clipboard!");
                    }}
                  >
                    Copy
                  </Button>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {renderMarkdown(result.text)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptGenerator;
