
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  /**
   * Generates a conversational response from the model.
   * Following the latest @google/genai SDK guidelines:
   * 1. Initialize GoogleGenAI right before the call for up-to-date environment variable access.
   * 2. Use gemini-3-flash-preview for fast, chat-appropriate responses.
   * 3. Disable thinking budget for minimum latency during simulated live video calls.
   */
  async generateResponse(userInput: string, platformName: string) {
    // Fix: Initialize the client using the apiKey property and process.env.API_KEY directly
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userInput,
        config: {
          systemInstruction: `You are the specific and only person featured on the premium platform "${platformName}". 
          A fan or subscriber is video calling you directly. 
          Your tone should be intimate, charming, and exclusive. 
          Respond as if this is a private 1-on-1 video call. 
          Keep responses brief (1-2 sentences) and conversational.
          You are talking to them from your private room.`,
          temperature: 0.9,
          topP: 0.95,
          // Fix: Optimize for latency by disabling the thinking budget
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      // Fix: Access response text using the .text property (not a method)
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "I love hearing you talk, tell me more about your day.";
    }
  }
}

export const geminiService = new GeminiService();
