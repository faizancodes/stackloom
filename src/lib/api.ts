import type {
  GithubActivityApiResponse,
  GithubRepoApiResponse,
  NpmPackageApiResponse,
  NpmTrendsApiResponse,
  NpmsScoreApiResponse,
  StackExchangeQuestionsApiResponse,
} from "@/lib/types";

export interface ApiFetchOptions extends RequestInit {
  timeoutMs?: number;
}

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export async function fetchWithTimeout<T>(url: string, options: ApiFetchOptions = {}): Promise<T> {
  const { timeoutMs = 15000, ...init } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchJson<T>(url: string): Promise<T> {
  return fetchWithTimeout<T>(url);
}

export async function fetchGithubRepo(url: string) {
  return fetchJson<GithubRepoApiResponse>(url);
}

export async function fetchGithubRepoWithOptions(url: string, options?: ApiFetchOptions) {
  return fetchWithTimeout<GithubRepoApiResponse>(url, options);
}

export async function fetchGithubActivity(url: string) {
  return fetchJson<GithubActivityApiResponse>(url);
}

export async function fetchGithubActivityWithOptions(url: string, options?: ApiFetchOptions) {
  return fetchWithTimeout<GithubActivityApiResponse>(url, options);
}

export async function fetchNpmPackage(url: string) {
  return fetchJson<NpmPackageApiResponse>(url);
}

export async function fetchNpmPackageWithOptions(url: string, options?: ApiFetchOptions) {
  return fetchWithTimeout<NpmPackageApiResponse>(url, options);
}

export async function fetchNpmTrends(url: string) {
  return fetchJson<NpmTrendsApiResponse>(url);
}

export async function fetchNpmTrendsWithOptions(url: string, options?: ApiFetchOptions) {
  return fetchWithTimeout<NpmTrendsApiResponse>(url, options);
}

export async function fetchNpmsScore(url: string) {
  return fetchJson<NpmsScoreApiResponse>(url);
}

export async function fetchNpmsScoreWithOptions(url: string, options?: ApiFetchOptions) {
  return fetchWithTimeout<NpmsScoreApiResponse>(url, options);
}

export async function fetchStackExchangeQuestions(url: string) {
  return fetchJson<StackExchangeQuestionsApiResponse>(url);
}

export async function fetchStackExchangeQuestionsWithOptions(url: string, options?: ApiFetchOptions) {
  return fetchWithTimeout<StackExchangeQuestionsApiResponse>(url, options);
}
