import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing. AI features will not work.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getBeautyTip = async (topic) => {
  const client = getClient();
  if (!client) return "מערכת הטיפים אינה זמינה כרגע (חסר מפתח API).";

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert aesthetician named Rivki (ריבקי). Give a short, professional, and friendly tip (max 2 sentences) in Hebrew about: ${topic}. The tone should be warm, encouraging, and professional. Focus on eyebrows or facial care.`,
    });
    
    return response.text || "לא הצלחתי לייצר טיפ כרגע, נסי שוב מאוחר יותר.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "אירעה שגיאה בקבלת הטיפ. אנא נסי שוב.";
  }
};