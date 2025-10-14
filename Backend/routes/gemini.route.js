import express from "express";
import fetch from "node-fetch"; // if Node < 20

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=${process.env.VITE_GOOGLE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API error:", data.error);
      return res.status(500).json({ error: data.error });
    }

    res.json(data);
  } catch (err) {
    console.error("Gemini fetch failed:", err);
    res.status(500).json({ error: "Failed to call Gemini API" });
  }
});

export default router;
