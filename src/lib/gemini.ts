import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Get from environment variables in Vite
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function generateAIResponse(
  messages: ChatMessage[],
): Promise<string> {
  // Fallback if no API key is provided
  if (!API_KEY) {
    await sleep(1500);
    const lastMessage = messages[messages.length - 1]?.content.toLowerCase();
    if (lastMessage?.includes("plan my week")) {
      return "*(Mock Mode - Add VITE_GEMINI_API_KEY)* \n\nHere's a suggested schedule for your week based on your usual high-productivity hours: \n\n**Monday-Wednesday**: Focus on deep work (Coding/Design) between 10 AM and 2 PM.";
    }
    return "*(Mock Mode - Add VITE_GEMINI_API_KEY to your .env file to enable real AI)*\n\nI understand. I'm your FocusPilot AI Assistant, analyzing your productivity patterns. Could you provide a bit more detail?";
  }

  try {
    // Convert our message format to Gemini format
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history,
      systemInstruction: "You are FocusPilot AI, an elite productivity assistant for freelancers. You are embedded in a premium SaaS dashboard. Keep your answers concise, highly actionable, and professional but modern. Use markdown formatting like bolding and lists when appropriate. Focus on preventing burnout, optimizing schedules, and boosting earnings efficiency."
    });

    const lastUserMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastUserMessage);
    
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my neural net right now. Please check your API key or try again later.";
  }
}
