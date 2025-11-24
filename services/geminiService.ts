import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return client;
};

export const streamChatResponse = async (
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  newMessage: string
) => {
  const ai = getClient();
  
  // Transform history to match the SDK expectation if needed, 
  // but simpler here: we just create a new chat every time with history 
  // or just use generateContentStream with a constructed prompt if state management is complex.
  // For this portfolio, we'll use a Chat session.
  
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
    history: history,
  });

  const result = await chat.sendMessageStream({ message: newMessage });
  return result;
};
