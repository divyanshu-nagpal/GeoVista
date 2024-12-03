import { AI_IMAGE_ANALYSIS_PROMPT } from "@/constants/options";
import { GoogleGenerativeAI } from "@google/generative-ai";

// API Configuration
export const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
export const genAI = new GoogleGenerativeAI(apiKey);

// Generation Configuration
export const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

const fileToGenerativePart = async (file) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64EncodedData = reader.result.split(',')[1];
        resolve(base64EncodedData);
      };
      reader.readAsDataURL(file);
    });
  
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };
  
  export const analyzeImageWithGemini = async (imageFile) => {
    try {
      // Get the model
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
  
      // Convert the file to the format Gemini expects
      const imagePart = await fileToGenerativePart(imageFile);
  
      // Generate content
      const result = await model.generateContent([
        imagePart,
        AI_IMAGE_ANALYSIS_PROMPT
      ]);
  
      const response = await result.response;
      const text = response.text();
      
      // Parse JSON from response
      try {
        return JSON.parse(text);
      } catch (e) {
        // If the response isn't valid JSON, try to extract JSON from markdown
        const jsonStr = text.replace(/```json\n|\n```/g, '');
        return JSON.parse(jsonStr);
      }
  
    } catch (error) {
      console.error("Error analyzing image:", error);
      throw error;
    }
  };
