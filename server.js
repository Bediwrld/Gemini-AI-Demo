import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const PORT = 5000;
const API_KEY = "AIzaSyAWvNeaZrGQSK3zOPSnkX6lwPtJCQYMATk";

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(API_KEY);

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    
    // Correct way to extract response text
    const response = result.response?.candidates?.[0]?.content || "No response generated.";
    
    res.json({ response });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
