import { NextRequest } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { getAnthropicClient } from "@/lib/anthropic";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompt-builder";
import { isValidPair } from "@/lib/forex-pairs";
import { checkNewsCalendar } from "@/lib/news-calendar";
import type { AnalysisResult, AnalyzeResponse } from "@/types/analysis";

const MAX_BASE64_SIZE = 5 * 1024 * 1024 * 1.37; // ~6.85MB after base64 encoding of 5MB
const ACCEPTED_MIME_PREFIXES = [
  "data:image/png",
  "data:image/jpeg",
  "data:image/webp",
];

function isValidBase64Image(b64: string): boolean {
  // Raw base64 without data URI prefix — we check size only
  if (typeof b64 !== "string" || b64.length === 0) return false;
  if (b64.length > MAX_BASE64_SIZE) return false;
  return true;
}

function detectMediaType(
  b64: string
): "image/png" | "image/jpeg" | "image/webp" {
  // Detect from base64 magic bytes
  if (b64.startsWith("iVBOR")) return "image/png";
  if (b64.startsWith("/9j/")) return "image/jpeg";
  if (b64.startsWith("UklGR")) return "image/webp";
  // Default to jpeg
  return "image/jpeg";
}

export async function POST(request: NextRequest) {
  try {
    // Parse body
    let body: { pair?: string; images?: string[] };
    try {
      body = await request.json();
    } catch {
      return Response.json(
        { success: false, error: "Invalid JSON body" } satisfies AnalyzeResponse,
        { status: 400 }
      );
    }

    const { pair, images } = body;

    // Validate pair
    if (!pair || typeof pair !== "string" || !isValidPair(pair)) {
      return Response.json(
        {
          success: false,
          error: "Invalid or missing currency pair",
        } satisfies AnalyzeResponse,
        { status: 400 }
      );
    }

    // Check news calendar for high-impact events
    try {
      const newsCheck = await checkNewsCalendar(pair);
      if (newsCheck.hasHighImpactNews) {
        Sentry.captureMessage(`Analysis blocked due to high-impact news: ${pair}`, 'info');
        return Response.json(
          {
            success: false,
            error: newsCheck.warningMessage || "High-impact news event detected. Trading not recommended during this period.",
            raw: JSON.stringify(newsCheck.upcomingEvents, null, 2),
          } satisfies AnalyzeResponse,
          { status: 400 }
        );
      }
    } catch (newsError) {
      // Log but don't block analysis if news check fails
      Sentry.captureException(newsError);
      console.warn("News calendar check failed, proceeding with analysis:", newsError);
    }

    // Validate images
    if (!Array.isArray(images) || images.length !== 3) {
      return Response.json(
        {
          success: false,
          error: "Exactly 3 chart images are required (1D, 1H, 5M)",
        } satisfies AnalyzeResponse,
        { status: 400 }
      );
    }

    for (let i = 0; i < images.length; i++) {
      if (!isValidBase64Image(images[i])) {
        const labels = ["1-Day", "1-Hour", "5-Minute"];
        return Response.json(
          {
            success: false,
            error: `Invalid or oversized image for ${labels[i]} chart`,
          } satisfies AnalyzeResponse,
          { status: 400 }
        );
      }
    }

    // Call Anthropic
    const client = getAnthropicClient();
    const systemPrompt = buildSystemPrompt(pair);
    const userPrompt = buildUserPrompt(pair);

    const imageContents = images.map((b64, idx) => {
      const labels = ["1-Day (Daily)", "1-Hour", "5-Minute"];
      return [
        {
          type: "text" as const,
          text: `${labels[idx]} chart:`,
        },
        {
          type: "image" as const,
          source: {
            type: "base64" as const,
            media_type: detectMediaType(b64),
            data: b64,
          },
        },
      ];
    });

    const response = await client.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: [
            ...imageContents.flat(),
            { type: "text", text: userPrompt },
          ],
        },
      ],
    });

    // Extract text response
    const textBlock = response.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return Response.json(
        {
          success: false,
          error: "AI model returned no text response",
        } satisfies AnalyzeResponse,
        { status: 500 }
      );
    }

    const rawText = textBlock.text.trim();

    // Parse JSON from response
    let analysisData: AnalysisResult;
    try {
      // Try to extract JSON from the response (handle cases where model wraps in markdown)
      let jsonStr = rawText;
      const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1].trim();
      }
      analysisData = JSON.parse(jsonStr);
    } catch {
      return Response.json(
        {
          success: false,
          error:
            "AI returned malformed analysis data. The response could not be parsed.",
          raw: rawText,
        } satisfies AnalyzeResponse,
        { status: 500 }
      );
    }

    // Validate required fields
    const requiredFields = [
      "direction",
      "probability",
      "confidence_level",
      "daily_analysis",
      "hourly_analysis",
      "entry_analysis",
      "decision_rationale",
      "key_levels",
      "invalidation_condition",
      "risk_warning",
    ];

    for (const field of requiredFields) {
      if (!(field in analysisData)) {
        return Response.json(
          {
            success: false,
            error: `Analysis incomplete: missing "${field}" field`,
            raw: rawText,
          } satisfies AnalyzeResponse,
          { status: 500 }
        );
      }
    }

    // Clamp probability
    analysisData.probability = Math.max(
      0,
      Math.min(100, Math.round(analysisData.probability))
    );

    return Response.json({
      success: true,
      data: analysisData,
    } satisfies AnalyzeResponse);
  } catch (err) {
    console.error("Analysis API error:", err);
    Sentry.captureException(err);

    const message =
      err instanceof Error ? err.message : "Unknown error occurred";

    // Check for API key issues
    if (message.includes("401") || message.includes("authentication") || message.includes("API key")) {
      return Response.json(
        {
          success: false,
          error: "API authentication failed. Please check your Anthropic API key is correctly set in environment variables.",
          raw: message,
        } satisfies AnalyzeResponse,
        { status: 500 }
      );
    }

    if (message.includes("timeout") || message.includes("ETIMEDOUT")) {
      return Response.json(
        {
          success: false,
          error:
            "Analysis timed out. The AI model took too long to respond. Please try again.",
        } satisfies AnalyzeResponse,
        { status: 504 }
      );
    }

    // Return detailed error for debugging
    return Response.json(
      {
        success: false,
        error: `Analysis failed: ${message}`,
        raw: err instanceof Error ? err.stack : String(err),
      } satisfies AnalyzeResponse,
      { status: 500 }
    );
  }
}
