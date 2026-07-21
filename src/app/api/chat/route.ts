import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
  baseURL: process.env.CLAUDE_API_BASE_URL,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages,
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Claude API error:", error);
    return NextResponse.json(
      { error: "حدث خطأ في الاتصال بالسيرفر" },
      { status: 500 }
    );
  }
}
