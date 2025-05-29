import axios from 'axios';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";

export const reduceExistingPrompt = async (text: string): Promise<string> => {
  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Reduce the length of this prompt while maintaining its core meaning and essential instructions. Aim for about 100-150 words:\n\n${text}`
          }]
        }]
      }
    );
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to reduce prompt');
    }
    throw error;
  }
};

export const generateReducedPrompt = async (input: string): Promise<string> => {
  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Create a concise, focused prompt (100-150 words) based on this description: "${input}". Make it clear and specific while keeping it brief.`
          }]
        }]
      }
    );
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to generate reduced prompt');
    }
    throw error;
  }
};