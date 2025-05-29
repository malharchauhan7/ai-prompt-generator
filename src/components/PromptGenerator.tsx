import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  reduceExistingPrompt,
  generateReducedPrompt,
} from "@/utils/api/promptApis";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Checkbox } from "@/components/ui/checkbox";
import { generateEnhancedPrompt } from "@/utils/api/generateEnhancedPrompt";

interface PromptResult {
  id: string;
  text: string;
  timestamp?: number;
  isReducing?: boolean;
}

const PromptGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [useReducedPrompt, setUseReducedPrompt] = useState(false);
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

  const handleReducePrompt = async (resultId: string, originalText: string) => {
    setResults((prev) =>
      prev.map((r) => (r.id === resultId ? { ...r, isReducing: true } : r))
    );

    try {
      const reducedText = await reduceExistingPrompt(originalText);
      const newResult: PromptResult = {
        id: Date.now().toString(),
        text: reducedText,
        timestamp: Date.now(),
      };
      setResults((prev) => [
        newResult,
        ...prev.map((r) =>
          r.id === resultId ? { ...r, isReducing: false } : r
        ),
      ]);
      toast.success("Prompt reduced successfully!");
    } catch (err) {
      console.error("Error reducing prompt:", err);
      toast.error("Failed to reduce prompt");
      setResults((prev) =>
        prev.map((r) => (r.id === resultId ? { ...r, isReducing: false } : r))
      );
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt description");
      return;
    }

    setIsLoading(true);

    try {
      const response = await (useReducedPrompt
        ? generateReducedPrompt
        : generateEnhancedPrompt)(prompt);

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
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="reduced"
                checked={useReducedPrompt}
                onCheckedChange={(checked) =>
                  setUseReducedPrompt(checked as boolean)
                }
              />
              <label
                htmlFor="reduced"
                className="text-sm text-muted-foreground cursor-pointer select-none"
              >
                Reduced Prompt (100-150 words)
              </label>
            </div>
            <Button
              className="bg-accent hover:bg-accent/80 text-accent-foreground text-sm py-1.5 px-4 h-8 transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02] hover:bg-purple-600 hover:text-white"
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
              <div key={result.id} className="space-y-2">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground h-6"
                    onClick={() => handleReducePrompt(result.id, result.text)}
                    disabled={result.isReducing}
                  >
                    {result.isReducing ? "Reducing..." : "Reduce Length"}
                  </Button>
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
                <div className="prose prose-sm dark:prose-invert max-w-none glass-effect p-4 rounded-lg animate-fade-in">
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
