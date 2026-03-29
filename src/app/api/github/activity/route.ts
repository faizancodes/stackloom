import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { API_TIMEOUT_MS } from "@/lib/constants";
import type { GithubActivityApiResponse, GitHubActivityPoint } from "@/lib/types";

const QuerySchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function toActivityPoint(date: string, commits: number): GitHubActivityPoint {
  return { date, commits, issuesOpened: 0, issuesClosed: 0, releases: 0 };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const parsed = QuerySchema.safeParse({ owner: url.searchParams.get("owner") ?? "", repo: url.searchParams.get("repo") ?? "" });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400, headers: corsHeaders });
    }

    const response = await fetch(`https://api.github.com/repos/${parsed.data.owner}/${parsed.data.repo}/stats/commit_activity`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "Stackloom" },
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "GitHub activity unavailable" }, { status: 502, headers: corsHeaders });
    }

    const data = (await response.json()) as Array<{ week: number; total: number }>;
    const activity = data.map((point) => toActivityPoint(new Date(point.week * 1000).toISOString(), point.total));
    const payload: GithubActivityApiResponse = { activity, source: "github" };
    return NextResponse.json(payload, { headers: corsHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500, headers: corsHeaders });
  }
}
