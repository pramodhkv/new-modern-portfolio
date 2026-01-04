import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync } from "fs";
import { join } from "path";

// In-memory rate limiting (resets on function cold start)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

interface IChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface IChatRequest {
  messages: IChatMessage[];
  sessionId: string;
}

interface IChatResponse {
  message?: string;
  remaining?: number;
  error?: string;
}

interface IOpenAIResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
    index: number;
  }>;
  created: number;
  id: string;
  model: string;
  object: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  };
}

// Load knowledge base from file
let knowledgeBase: any;
try {
  const knowledgePath = join(process.cwd(), "src", "data", "aiKnowledge.json");
  const knowledgeData = readFileSync(knowledgePath, "utf-8");
  knowledgeBase = JSON.parse(knowledgeData);
} catch (error) {
  console.error("Failed to load knowledge base:", error);
  knowledgeBase = {
    personalInfo: {
      name: "Portfolio Owner",
      title: "Developer",
      bio: "Please update the knowledge base file.",
    },
  };
}

const SYSTEM_PROMPT = `You are an AI assistant for a portfolio website. Your role is to answer questions about the portfolio owner in a friendly, professional manner.

Knowledge Base:
${JSON.stringify(knowledgeBase, null, 2)}

Guidelines:
- Answer questions based ONLY on the knowledge base provided above
- Be conversational, friendly, but maintain professionalism
- If asked something not in the knowledge base, politely say you don't have that information and suggest contacting directly
- Keep responses concise (2-4 sentences unless more detail is specifically requested)
- Don't make up information or hallucinate details
- If asked about availability or hiring, refer to the contact information
- Use emojis sparingly and appropriately to keep the tone friendly
- Encourage users to reach out via the contact form for detailed discussions or opportunities`;

const RATE_LIMIT = parseInt(process.env.CHAT_RATE_LIMIT || "20", 10);
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function checkRateLimit(sessionId: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const record = rateLimitStore.get(sessionId);

  // Clean up expired entries
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, sessionId } = req.body as IChatRequest;

    // Validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid request: messages array is required" });
    }

    if (!sessionId || typeof sessionId !== "string") {
      return res
        .status(400)
        .json({ error: "Invalid request: sessionId is required" });
    }

    // Rate limiting check
    const { allowed, remaining } = checkRateLimit(sessionId);
    if (!allowed) {
      return res.status(429).json({
        error:
          "You have reached the maximum number of questions for this session (20 questions per day). Please try again tomorrow!",
        remaining: 0,
      });
    }

    // Validate OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      return res
        .status(500)
        .json({ error: "Chat service is not configured properly" });
    }

    // Call OpenAI API
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

      if (openaiResponse.status === 401) {
        return res
          .status(500)
          .json({ error: "Chat service authentication failed" });
      }

      if (openaiResponse.status === 429) {
        return res.status(500).json({
          error:
            "Chat service is temporarily unavailable. Please try again later.",
        });
      }

      return res.status(500).json({ error: "Failed to get AI response" });
    }

    const data = (await openaiResponse.json()) as IOpenAIResponse;
    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      return res.status(500).json({ error: "No response from AI service" });
    }

    return res.status(200).json({
      message: assistantMessage,
      remaining,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({
      error: "An unexpected error occurred. Please try again.",
    });
  }
}
