import type {
  GithubActivityApiResponse,
  GithubRepoApiResponse,
  NpmPackageApiResponse,
  NpmTrendsApiResponse,
  NpmsScoreApiResponse,
  StackExchangeQuestionsApiResponse,
} from "@/lib/types";

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
}

export async function fetchGithubRepo(url: string) {
  return fetchJson<GithubRepoApiResponse>(url);
}

export async function fetchGithubActivity(url: string) {
  return fetchJson<GithubActivityApiResponse>(url);
}

export async function fetchNpmPackage(url: string) {
  return fetchJson<NpmPackageApiResponse>(url);
}

export async function fetchNpmTrends(url: string) {
  return fetchJson<NpmTrendsApiResponse>(url);
}

export async function fetchNpmsScore(url: string) {
  return fetchJson<NpmsScoreApiResponse>(url);
}

export async function fetchStackExchangeQuestions(url: string) {
  return fetchJson<StackExchangeQuestionsApiResponse>(url);
}
