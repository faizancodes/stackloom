import type { PackageResolution } from "@/lib/types";

const normalizeQuery = (value: string) => value.trim().toLowerCase();

const slugify = (value: string) =>
  normalizeQuery(value)
    .replace(/https?:\/\//g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const extractRepository = (query: string) => {
  const githubMatch = query.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
  if (githubMatch) {
    return {
      repositoryOwner: githubMatch[1],
      repositoryName: githubMatch[2].replace(/\.git$/i, ""),
      repositoryUrl: `https://github.com/${githubMatch[1]}/${githubMatch[2].replace(/\.git$/i, "")}`,
    };
  }

  const shorthandMatch = query.match(/^([^/]+)\/([^/]+)$/);
  if (shorthandMatch) {
    return {
      repositoryOwner: shorthandMatch[1],
      repositoryName: shorthandMatch[2],
      repositoryUrl: `https://github.com/${shorthandMatch[1]}/${shorthandMatch[2]}`,
    };
  }

  return {};
};

export function resolvePackageQuery(query: string, ecosystem = "npm"): PackageResolution {
  const normalized = query.trim();
  const repository = extractRepository(normalized);
  const packageName = repository.repositoryName ?? normalized.replace(/^@/, "");
  const npmName = packageName.startsWith("@") ? packageName : packageName;
  const stackExchangeTag = slugify(packageName || normalized);

  return {
    query: normalized,
    packageName,
    ecosystem,
    npmName,
    stackExchangeTag,
    ...repository,
  };
}

export const packageQueries = {
  search: (query: string) => `/api/npm/package?query=${encodeURIComponent(query)}`,
  githubRepo: (owner: string, repo: string) => `/api/github/repo?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`,
  githubActivity: (owner: string, repo: string) => `/api/github/activity?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`,
  npmTrends: (name: string) => `/api/npm/trends?name=${encodeURIComponent(name)}`,
  npmsScore: (name: string) => `/api/npms/score?name=${encodeURIComponent(name)}`,
  stackExchangeQuestions: (tag: string) => `/api/stackexchange/questions?tag=${encodeURIComponent(tag)}`,
  resolve: (query: string, ecosystem = "npm") => resolvePackageQuery(query, ecosystem),
};
