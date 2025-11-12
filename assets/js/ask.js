// api/ask.js  (Vercel serverless function)
// Save this file as /api/ask.js
// Deploy to Vercel (or adapt for Netlify Functions).

const fetch = require("node-fetch");

const HF_QA_MODEL = "deepset/roberta-base-squad2";      // extractive QA
const HF_GEN_MODEL = "google/flan-t5-small";           // simple generative for steps

// Replace this with your portfolio data / about text
const PORTFOLIO_CONTEXT = `
I am Kelvin Kiambi, a frontend developer specializing in HTML, CSS, and JavaScript.
I create interactive and modern web interfaces, portfolios, and small web apps.
I experiment with AI integrations for websites and have experience in SEO, web design, and UX.
My projects include interactive portfolio websites, AI demo pages, and client-facing sites.
`;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { question } = req.body || {};
  if (!question || question.trim().length === 0) {
    res.status(400).json({ error: "Question is required" });
    return;
  }

  const HF_API_TOKEN = process.env.HF_API_TOKEN;
  if (!HF_API_TOKEN) {
    res.status(500).json({ error: "HF_API_TOKEN not configured on server" });
    return;
  }

  try {
    // 1) Call QA model to extract a concise answer from your portfolio context
    const qaResponse = await fetch(`https://api-inference.huggingface.co/models/${HF_QA_MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: { question, context: PORTFOLIO_CONTEXT } }),
    });

    if (!qaResponse.ok) {
      const text = await qaResponse.text();
      throw new Error(`QA model error: ${qaResponse.status} ${text}`);
    }

    const qaData = await qaResponse.json();
    // qaData often is { answer: "...", score: 0.98, start: X, end: Y } for extractive models
    const shortAnswer = qaData.answer || (Array.isArray(qaData) && qaData[0]?.answer) || "I couldn't find a short answer.";

    // 2) Call a generative model to produce a short, beginner-friendly 3-step guide
    const prompt = `You are a friendly assistant for beginners. The user asked: "${question}".
You found this short answer: "${shortAnswer}".
Based on that, give a clear, beginner-friendly 3-step guide (short sentences) the user can follow next. Keep it simple and actionable.`;

    const genResponse = await fetch(`https://api-inference.huggingface.co/models/${HF_GEN_MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 150 } }),
    });

    if (!genResponse.ok) {
      const text = await genResponse.text();
      throw new Error(`Generative model error: ${genResponse.status} ${text}`);
    }

    const genData = await genResponse.json();
    // The generative API often returns text in genData[0]?.generated_text or genData?.generated_text
    let guideText = "";
    if (typeof genData === "string") {
      guideText = genData;
    } else if (Array.isArray(genData) && genData[0] && genData[0].generated_text) {
      guideText = genData[0].generated_text;
    } else if (genData.generated_text) {
      guideText = genData.generated_text;
    } else {
      // fallback: simple templated steps
      guideText = `1) Read the answer: "${shortAnswer}"\n2) Try exploring related project links on the portfolio.\n3) Contact me for details or a demo.`;
    }

    // Return both the short answer and the guide
    res.status(200).json({
      answer: shortAnswer,
      guide: guideText.trim(),
      source: "portfolio-context",
    });
  } catch (err) {
    console.error("Error in /api/ask:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};
