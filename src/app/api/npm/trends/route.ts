import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { API_TIMEOUT_MS } from "@/lib/constants";
import type { NpmTrendPoint, NpmTrendsApiResponse } from "@/lib/types";

const QuerySchema = z.object({
  name: z.string().min(1),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function buildTrendPoint(date: string, downloads: number, version: string): NpmTrendPoint {
  return { date, downloads, version };
}

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

    const response = await fetch(`https://api.npmjs.org/downloads/range/last-30-days/${encodeURIComponent(parsed.data.name)}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "npm trends unavailable" }, { status: 502, headers: corsHeaders });
    }

    const data = (await response.json()) as { downloads?: Array<{ day: string; downloads: number }> };
    const trends = (data.downloads ?? []).map((point) => buildTrendPoint(point.day, point.downloads, parsed.data.name));
    const payload: NpmTrendsApiResponse = { trends, source: "npm" };
    return NextResponse.json(payload, { headers: corsHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500, headers: corsHeaders });
  }
}
