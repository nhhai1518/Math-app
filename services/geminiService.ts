import { GoogleGenAI } from "@google/genai";
import { Operation } from "../types";

// Helper to get the API key safely
const getApiKey = (): string | undefined => {
  return process.env.API_KEY;
};

export const explainMathOperation = async (
  num1: number, 
  num2: number, 
  operation: Operation, 
  result: number
): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    return "Vui lòng cấu hình API Key để sử dụng tính năng AI giải thích (env: API_KEY).";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const opSymbol = operation === Operation.ADD ? '+' : '-';
    const prompt = `
      Hãy giải thích phép tính toán học sau đây một cách thú vị và đơn giản cho người mới học (dưới 100 từ):
      ${num1} ${opSymbol} ${num2} = ${result}.
      Hãy dùng tiếng Việt, giọng điệu thân thiện, khuyến khích.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Không thể tạo lời giải thích lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã xảy ra lỗi khi kết nối với trợ lý AI.";
  }
};