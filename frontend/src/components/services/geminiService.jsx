import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      systemInstruction: 
        "You are VedicAI, an expert tutor in Vedic Mathematics based on the principles from 'Vedic Math' by Himanshu Pancholi. " +
        "You explain concepts clearly, provide step-by-step solutions using Vedic techniques, and generate custom practice problems. " +
        "Always format your responses with clear headings, examples, and visually separated steps."
    });
    this.history = [];
  }

  async sendMessage(message, contextData = {}) {
    try {
      // Add user context to improve responses
      const enhancedPrompt = this.enhancePromptWithContext(message, contextData);
      
      // Use chat for maintaining conversation history
      const chatSession = this.model.startChat({
        history: this.history,
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });
      
      const result = await chatSession.sendMessage(enhancedPrompt);
      const response = result.response.text();
      
      // Update history for conversation continuity
      this.history.push({ role: "user", parts: [{ text: message }] });
      this.history.push({ role: "model", parts: [{ text: response }] });
      
      return response;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "I apologize, but I'm having trouble connecting. Please try again in a moment.";
    }
  }
  
  enhancePromptWithContext(message, contextData) {
    // Add user context to help generate better responses
    const { lessonProgress, userSkillLevel, recentTopics } = contextData;
    
    let contextPrompt = message;
    
    if (lessonProgress) {
      contextPrompt += `\n\nContext: User has completed ${lessonProgress} lessons.`;
    }
    
    if (userSkillLevel) {
      contextPrompt += `\nUser skill level: ${userSkillLevel}`;
    }
    
    if (recentTopics && recentTopics.length) {
      contextPrompt += `\nRecent topics studied: ${recentTopics.join(", ")}`;
    }
    
    return contextPrompt;
  }
  
  clearHistory() {
    this.history = [];
  }
}

export default new GeminiService();