import axios from "axios";

export const generateEnhancedPrompt = async (input: string): Promise<string> => {
  const API_KEY = import.meta.env.VITE_PUBLIC_GEMINI_API_KEY;
  const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";

  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [{
          parts: [{
            // text: `Enhance this prompt: "${input}". Make it clear, specific, and well-structured.`
            text:`You are an AI prompt enhancer. A user will provide you with a very simple topic, idea, or vague prompt. Your task is to transform it into a detailed, well-structured, and goal-oriented prompt that improves the quality of AI-generated responses.

            Here’s what you should do:
            1. Identify the user's intent or goal behind the vague prompt.
            2. Add necessary context, tone, format, and output instructions.
            3. Clarify any ambiguity, and make assumptions only when reasonable.
            4. Structure the final output in a way that's clear for an AI to follow.

            make sure to remember that give direct prompt don't write anything like "Okay,I understand..." or "Enhanced Prompt" just give direct Enhanced Prompt

            Input from user: ${input}`
          }]
        }]
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to generate prompt');
    }
    throw error;
  }
};
