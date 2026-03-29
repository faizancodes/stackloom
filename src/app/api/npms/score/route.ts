import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { API_TIMEOUT_MS } from "@/lib/constants";
import type { NpmsScoreApiResponse } from "@/lib/types";

const QuerySchema = z.object({
  name: z.string().min(1),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const parsed = QuerySchema.safeParse({ name: url.searchParams.get("name") ?? "" });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400, headers: corsHeaders });
    }

    const response = await fetch(`https://api.npms.io/v2/package/${encodeURIComponent(parsed.data.name)}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "npms score unavailable" }, { status: 502, headers: corsHeaders });
    }

    const data = (await response.json()) as { score?: { final?: number; detail?: { quality?: number; popularity?: number; maintenance?: number } } };
    const payload: NpmsScoreApiResponse = {
      score: Number(data.score?.final ?? 0),
      quality: Number(data.score?.detail?.quality ?? 0),
      popularity: Number(data.score?.detail?.popularity ?? 0),
      maintenance: Number(data.score?.detail?.maintenance ?? 0),
      source: "npms",
    };
    return NextResponse.json(payload, { headers: corsHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500, headers: corsHeaders });
  }
}
