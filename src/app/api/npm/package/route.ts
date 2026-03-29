import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { API_TIMEOUT_MS } from "@/lib/constants";
import type { NpmPackageApiResponse, NpmPackageMetadata } from "@/lib/types";

const QuerySchema = z.object({
  query: z.string().min(1),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function buildPackageMetadata(name: string, data: Record<string, unknown>): NpmPackageMetadata {
  return {
    name,
    version: String(data.version ?? "0.0.0"),
    description: String(data.description ?? ""),
    homepage: String(data.homepage ?? ""),
    repository: typeof data.repository === "object" && data.repository && "url" in data.repository ? String((data.repository as Record<string, unknown>).url ?? "") : String(data.repository ?? ""),
    license: String(data.license ?? ""),
    downloads: Number(data.downloads ?? 0),
    weeklyDownloads: Number(data.weeklyDownloads ?? 0),
    monthlyDownloads: Number(data.monthlyDownloads ?? 0),
    dependents: Number(data.dependents ?? 0),
    dependencies: Number(data.dependencies ?? 0),
    publishedAt: String(data.publishedAt ?? data.time ?? ""),
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const parsed = QuerySchema.safeParse({ query: url.searchParams.get("query") ?? "" });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400, headers: corsHeaders });
    }

    const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(parsed.data.query)}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "npm package not found" }, { status: 404, headers: corsHeaders });
    }

    const data = (await response.json()) as Record<string, unknown>;
    const payload: NpmPackageApiResponse = { package: buildPackageMetadata(parsed.data.query, data), source: "npm" };
    return NextResponse.json(payload, { headers: corsHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500, headers: corsHeaders });
  }
}
