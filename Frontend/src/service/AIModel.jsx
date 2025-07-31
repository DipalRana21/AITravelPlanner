

const tools = [
  {
    googleSearch: {},
  },
];

const config = {
  thinkingConfig: {
    thinkingBudget: -1,
  },
  tools,
};


// Example usage function

export async function sendPromptToGemini(promptText) {
  try {
    const response = await fetch('http://localhost:5000/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ promptText }),
    });

    const data = await response.json();
    console.log("🧠 Gemini response from backend:", data.result);
    return data.result;
  } catch (error) {
    console.error("❌ Frontend fetch error:", error);
    return null;
  }
}

