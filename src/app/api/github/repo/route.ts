import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { API_TIMEOUT_MS } from "@/lib/constants";
import type { GithubRepoApiResponse, GitHubRepository } from "@/lib/types";

const QuerySchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function buildRepository(owner: string, repo: string, data: Record<string, unknown>): GitHubRepository {
  return {
    owner,
    name: repo,
    fullName: `${owner}/${repo}`,
    stars: Number(data.stargazers_count ?? 0),
    forks: Number(data.forks_count ?? 0),
    openIssues: Number(data.open_issues_count ?? 0),
    watchers: Number(data.subscribers_count ?? data.watchers_count ?? 0),
    lastPushAt: String(data.pushed_at ?? ""),
    createdAt: String(data.created_at ?? ""),
    updatedAt: String(data.updated_at ?? ""),
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const parsed = QuerySchema.safeParse({
      owner: url.searchParams.get("owner") ?? "",
      repo: url.searchParams.get("repo") ?? "",
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400, headers: corsHeaders });
    }

    const response = await fetch(`https://api.github.com/repos/${parsed.data.owner}/${parsed.data.repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "Stackloom",
      },
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "GitHub repository not found" }, { status: response.status === 404 ? 404 : 502, headers: corsHeaders });
    }

    const data = (await response.json()) as Record<string, unknown>;
    const payload: GithubRepoApiResponse = { repository: buildRepository(parsed.data.owner, parsed.data.repo, data), source: "github" };
    return NextResponse.json(payload, { headers: corsHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500, headers: corsHeaders });
  }
}
