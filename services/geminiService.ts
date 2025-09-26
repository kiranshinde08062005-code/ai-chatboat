
import { GoogleGenAI, Chat } from "@google/genai";
import type { ChatMessage } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are an expert cybersecurity AI assistant named CSTP (Cybersecurity Threat Predictor). Your role is to analyze cybersecurity threats and provide clear, concise, and actionable advice.
- Explain complex topics like phishing, DDoS, ransomware, and zero-day exploits in simple terms.
- When a user asks about a threat, provide a brief explanation, identify potential risks, and suggest specific mitigation steps.
- Do not break character. Respond in a professional, helpful, and slightly formal tone suitable for a security operations center.
- Keep responses well-structured, using markdown for lists and bold text for emphasis where appropriate.`;

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction,
  },
});

export const sendMessageToGemini = async (message: string, history: ChatMessage[]): Promise<string> => {
  try {
     // The current implementation of chat.sendMessage does not require history, 
     // as the Chat object maintains state. This is kept for potential future stateless implementations.
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Error: Could not get a response from the AI model. Please check the configuration and API key.";
  }
};
