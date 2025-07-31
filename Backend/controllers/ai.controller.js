import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';


export const generateTripPlan = async (req, res) => {
  const { promptText, userId } = req.body;

  if (!promptText || !userId) return res.status(400).json({ error: "Prompt and User ID are required" });

 

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const payload = { contents: [{ role: "user", parts: [{ text: promptText }] }] };

    const response = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" }
    });

    const resultText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("🧠 Gemini backend response:", resultText);




 

  } catch (error) {
  console.error("🚨 Gemini Error Status:", error.response?.status);
  console.error("🚨 Gemini Error Data:", error.response?.data);

  return res.status(500).json({
    error: "Gemini failed",
    status: error.response?.status,
    details: error.response?.data,
  });
}

};

