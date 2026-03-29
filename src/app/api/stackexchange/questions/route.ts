import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { API_TIMEOUT_MS } from "@/lib/constants";
import type { StackExchangeQuestion, StackExchangeQuestionsApiResponse } from "@/lib/types";

const QuerySchema = z.object({
  tag: z.string().min(1),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function toQuestion(item: Record<string, unknown>): StackExchangeQuestion {
  return {
    id: Number(item.question_id ?? 0),
    title: String(item.title ?? ""),
    link: String(item.link ?? ""),
    creationDate: new Date(Number(item.creation_date ?? 0) * 1000).toISOString(),
    lastActivityDate: new Date(Number(item.last_activity_date ?? 0) * 1000).toISOString(),
    isAnswered: Boolean(item.is_answered ?? false),
    answerCount: Number(item.answer_count ?? 0),
    score: Number(item.score ?? 0),
    tags: Array.isArray(item.tags) ? item.tags.map(String) : [],
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const parsed = QuerySchema.safeParse({ tag: url.searchParams.get("tag") ?? "" });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400, headers: corsHeaders });
    }

    const response = await fetch(`https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&tagged=${encodeURIComponent(parsed.data.tag)}&site=stackoverflow&pagesize=20`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "StackExchange questions unavailable" }, { status: 502, headers: corsHeaders });
    }

    const data = (await response.json()) as { items?: Record<string, unknown>[]; total?: number };
    const questions = (data.items ?? []).map(toQuestion);
    const unresolved = questions.filter((question) => !question.isAnswered).length;
    const recent = questions.filter((question) => Date.now() - new Date(question.lastActivityDate).getTime() < 7 * 24 * 60 * 60 * 1000).length;
    const last30Days = questions.filter((question) => Date.now() - new Date(question.creationDate).getTime() < 30 * 24 * 60 * 60 * 1000).length;
    const payload: StackExchangeQuestionsApiResponse = { questions, summary: { total: data.total ?? questions.length, unresolved, recent, last30Days }, source: "stackexchange" };
    return NextResponse.json(payload, { headers: corsHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500, headers: corsHeaders });
  }
}
