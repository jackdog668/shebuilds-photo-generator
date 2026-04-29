import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, ipFromRequest } from "@/lib/photo/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RequestSchema = z
  .object({
    prompt: z.string().min(10).max(2000),
    negative: z.string().max(2000).optional(),
  })
  .strict();

const GEMINI_MODEL = "gemini-2.5-flash-image";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const RATE_LIMIT_PER_HOUR = 5;

function err(status: number, message: string, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[generate] GEMINI_API_KEY not set");
    return err(503, "AI generation unavailable.");
  }

  const ip = ipFromRequest(req);
  const limit = checkRateLimit(`generate:${ip}`, RATE_LIMIT_PER_HOUR, 60 * 60 * 1000);
  if (!limit.ok) {
    const retryAfter = Math.ceil((limit.resetAt - Date.now()) / 1000);
    return NextResponse.json(
      {
        error: `Free tier limit reached: ${RATE_LIMIT_PER_HOUR} AI generations per hour. Copy the prompt and paste into your favorite AI tool, or come back in a bit.`,
        retryAfter,
      },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return err(400, "Invalid JSON body.");
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return err(400, "Invalid request.", { issues: parsed.error.issues });
  }

  const { prompt, negative } = parsed.data;
  const fullPrompt = negative ? `${prompt}\n\nNegative prompt: ${negative}` : prompt;

  try {
    const res = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
        generationConfig: { responseModalities: ["IMAGE"] },
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[generate] gemini non-ok", res.status, text.slice(0, 400));
      return err(502, "Generation failed. Try the copy-prompt path.");
    }

    const data = (await res.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ inlineData?: { mimeType?: string; data?: string } }> };
      }>;
    };

    const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
    if (!part?.inlineData?.data) {
      console.error("[generate] gemini returned no image", JSON.stringify(data).slice(0, 400));
      return err(502, "AI returned no image. Try a different prompt or use the copy-prompt path.");
    }

    const mime = part.inlineData.mimeType ?? "image/png";
    return NextResponse.json({
      image: `data:${mime};base64,${part.inlineData.data}`,
      remaining: limit.remaining,
    });
  } catch (e) {
    console.error("[generate] unexpected error", e);
    return err(500, "Generation crashed. Try again or use the copy-prompt path.");
  }
}
