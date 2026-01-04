// Simple development server for testing the chat API locally
// Run with: npm run dev:api

import "dotenv/config";
import express from "express";
import cors from "cors";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory rate limiting
const rateLimitStore = new Map();
const RATE_LIMIT = 20;
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000;

// Load knowledge base
let knowledgeBase;
try {
  const knowledgePath = join(__dirname, "src", "data", "aiKnowledge.json");
  const knowledgeData = readFileSync(knowledgePath, "utf-8");
  knowledgeBase = JSON.parse(knowledgeData);
  console.log("✅ Knowledge base loaded successfully");
} catch (error) {
  console.error("❌ Failed to load knowledge base:", error);
  process.exit(1);
}

// Check for OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY not found in .env file");
  console.log("Please add your OpenAI API key to .env file:");
  console.log("OPENAI_API_KEY=sk-your-key-here\n");
  process.exit(1);
}

console.log("✅ OpenAI API key found");

const SYSTEM_PROMPT = `You are an AI assistant for a portfolio website. Your role is to answer questions about the portfolio owner in a friendly, professional manner.

Knowledge Base:
${JSON.stringify(knowledgeBase, null, 2)}

Guidelines:
- Answer questions based ONLY on the knowledge base provided above
- Be conversational, friendly, but maintain professionalism
- If asked something not in the knowledge base, politely say you don't have that information
- Keep responses concise (2-4 sentences unless more detail is requested)
- Don't make up information
- Encourage users to reach out via the contact form for detailed discussions`;

function checkRateLimit(sessionId) {
  const now = Date.now();
  const record = rateLimitStore.get(sessionId);

  if (record && now > record.resetAt) {
    rateLimitStore.delete(sessionId);
  }

  const current = rateLimitStore.get(sessionId);

  if (!current) {
    rateLimitStore.set(sessionId, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (current.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  current.count++;
  return { allowed: true, remaining: RATE_LIMIT - current.count };
}

app.post("/api/chat", async (req, res) => {
  try {
    const { messages, sessionId } = req.body;

    if (!messages || !Array.isArray(messages) || !sessionId) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    // Rate limiting disabled for development
    const { allowed, remaining } = checkRateLimit(sessionId);
    if (!allowed) {
      return res.status(429).json({
        error:
          "You have reached the maximum number of questions for this session (20 questions per day). Please try again tomorrow!",
        remaining: 0,
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res
        .status(500)
        .json({ error: "Chat service is not configured properly" });
    }

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          temperature: 0.7,
          max_tokens: 1000,
          presence_penalty: 0.6,
          frequency_penalty: 0.3,
        }),
      }
    );

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json();
      console.error("OpenAI API error:", error);
      return res.status(500).json({ error: "Failed to get AI response" });
    }

    const data = await openaiResponse.json();
    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      return res.status(500).json({ error: "No response from AI service" });
    }

    res.json({
      message: assistantMessage,
      remaining,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    res
      .status(500)
      .json({ error: "An unexpected error occurred. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(
    `\n🚀 Development API server running at http://localhost:${PORT}`
  );
  console.log(`📝 Chat endpoint: http://localhost:${PORT}/api/chat\n`);
  console.log(
    `Make sure your frontend is configured to use this port for API calls.\n`
  );
});
