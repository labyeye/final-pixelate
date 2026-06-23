import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/ai/genkit";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

export async function POST(req: NextRequest) {
  try {
    const { pdfBase64 } = await req.json();

    if (!pdfBase64) {
      return NextResponse.json(
        { error: "pdfBase64 is required" },
        { status: 400, headers: CORS },
      );
    }

    // Check decoded size — reject above 50 MB
    const byteSize = Math.ceil((pdfBase64.length * 3) / 4);
    if (byteSize > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: "PDF must be under 50 MB." },
        { status: 413, headers: CORS },
      );
    }

    const prompt = `You are a brand identity analyst. Carefully read the attached brand guide PDF and extract the following information. Return ONLY a valid JSON object with these exact keys — no markdown, no explanation, just raw JSON:

{
  "brandName": "string — the brand or company name",
  "primaryColors": ["array of hex codes or color names for primary brand colors, e.g. #044bab or Royal Blue"],
  "secondaryColors": ["array of hex codes or color names for secondary/accent colors"],
  "fonts": ["array of font/typeface names used, e.g. Inter, Playfair Display"],
  "brandVoice": "string — describe the brand tone and voice in 1-3 sentences",
  "notes": "string — any other important brand guidelines, rules, or notes worth capturing"
}

Rules:
- Extract actual hex codes if shown in the PDF (e.g. #FF5733), otherwise use descriptive color names
- If a value is not found, use an empty string or empty array
- Do not invent data — only extract what is explicitly stated in the document
- brandVoice should summarise how the brand communicates (formal, playful, professional, etc.)`;

    const models = ["googleai/gemini-2.5-flash", "googleai/gemini-1.5-flash"];
    let response: any;
    let lastErr: any;
    for (const model of models) {
      try {
        response = await ai.generate({
          model,
          prompt: [
            {
              media: {
                contentType: "application/pdf",
                url: `data:application/pdf;base64,${pdfBase64}`,
              },
            },
            { text: prompt },
          ],
        });
        break;
      } catch (err: any) {
        lastErr = err;
        const is503 = err?.status === 503 || err?.message?.includes("503") || err?.message?.toLowerCase().includes("unavailable");
        if (is503) {
          // try next model in list
          continue;
        }
        throw err;
      }
    }
    if (!response) {
      return NextResponse.json(
        { error: "AI service is temporarily unavailable due to high demand. Please try again in a minute." },
        { status: 503, headers: CORS }
      );
    }

    const rawText = response.text.trim();

    // Strip markdown code fences if Gemini wraps output
    const jsonText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    let extracted: Record<string, any>;
    try {
      extracted = JSON.parse(jsonText);
    } catch {
      console.error("[parse-brand-guide-pdf] JSON parse failed. Raw text:", rawText);
      return NextResponse.json(
        { error: "AI returned unexpected output. Please try again.", raw: rawText },
        { status: 422, headers: CORS },
      );
    }

    return NextResponse.json(
      {
        brandName: extracted.brandName || "",
        primaryColors: Array.isArray(extracted.primaryColors) ? extracted.primaryColors : [],
        secondaryColors: Array.isArray(extracted.secondaryColors) ? extracted.secondaryColors : [],
        fonts: Array.isArray(extracted.fonts) ? extracted.fonts : [],
        brandVoice: extracted.brandVoice || "",
        notes: extracted.notes || "",
      },
      { headers: CORS },
    );
  } catch (err: any) {
    console.error("[parse-brand-guide-pdf] Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to parse PDF" },
      { status: 500, headers: CORS },
    );
  }
}
