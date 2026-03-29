export interface PackageIdentifier {
  name: string;
  slug: string;
  ecosystem: string;
}

export interface GitHubRepository {
  owner: string;
  name: string;
  fullName: string;
  stars: number;
  forks: number;
  openIssues: number;
  watchers: number;
  lastPushAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface GitHubActivityPoint {
  date: string;
  commits: number;
  issuesOpened: number;
  issuesClosed: number;
  releases: number;
}

export interface NpmPackageMetadata {
  name: string;
  version: string;
  description: string;
  homepage: string;
  repository: string;
  license: string;
  downloads: number;
  weeklyDownloads: number;
  monthlyDownloads: number;
  dependents: number;
  dependencies: number;
  publishedAt: string;
}

export interface NpmTrendPoint {
  date: string;
  downloads: number;
  version: string;
}

export interface StackExchangeQuestion {
  id: number;
  title: string;
  link: string;
  creationDate: string;
  lastActivityDate: string;
  isAnswered: boolean;
  answerCount: number;
  score: number;
  tags: string[];
}

export interface StackExchangeQuestionSummary {
  total: number;
  unresolved: number;
  recent: number;
  last30Days: number;
}

export interface PackageScorecard {
  health: number;
  momentum: number;
  support: number;
  adoption: number;
  risk: number;
}

export interface PackageSignal {
  id: string;
  label: string;
  value: string;
  tone: "success" | "warning" | "error" | "info";
  description: string;
}

export interface PackageComparisonRow {
  label: string;
  values: string[];
}

export interface SearchFilters {
  query: string;
  ecosystem: string;
  sortBy: string;
  minScore: number;
}

export interface ComparisonState {
  selectedPackages: PackageIdentifier[];
}

export interface ApiErrorResponse {
  error: string;
}

export interface ApiSuccessResponse<T> {
  data: T;
}

export interface GithubRepoApiResponse {
  repository: GitHubRepository;
}

export interface GithubActivityApiResponse {
  activity: GitHubActivityPoint[];
}

export interface NpmPackageApiResponse {
  package: NpmPackageMetadata;
}

export interface NpmTrendsApiResponse {
  trends: NpmTrendPoint[];
}

export interface NpmsScoreApiResponse {
  score: number;
  quality: number;
  popularity: number;
  maintenance: number;
}

export interface StackExchangeQuestionsApiResponse {
  questions: StackExchangeQuestion[];
  summary: StackExchangeQuestionSummary;
}
