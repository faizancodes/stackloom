export const packageQueries = {
  search: (query: string) => `/api/npm/package?query=${encodeURIComponent(query)}`,
  githubRepo: (owner: string, repo: string) => `/api/github/repo?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`,
  githubActivity: (owner: string, repo: string) => `/api/github/activity?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`,
  npmTrends: (name: string) => `/api/npm/trends?name=${encodeURIComponent(name)}`,
  npmsScore: (name: string) => `/api/npms/score?name=${encodeURIComponent(name)}`,
  stackExchangeQuestions: (tag: string) => `/api/stackexchange/questions?tag=${encodeURIComponent(tag)}`,
};
