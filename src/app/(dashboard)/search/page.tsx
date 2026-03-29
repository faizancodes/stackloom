import { SearchBar } from "@/components/search/search-bar";
import { FilterPanel } from "@/components/search/filter-panel";
import { PackageResultCard } from "@/components/search/package-result-card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Card } from "@/components/ui/card";

const results = [
  {
    name: "react-query",
    ecosystem: "npm",
    score: 91,
    downloads: "2.4M weekly",
    unresolvedRatio: "12% unresolved",
    activity: "18 commits this month",
    category: "Data fetching",
  },
  {
    name: "zod",
    ecosystem: "npm",
    score: 88,
    downloads: "1.8M weekly",
    unresolvedRatio: "9% unresolved",
    activity: "11 commits this month",
    category: "Validation",
  },
  {
    name: "next-auth",
    ecosystem: "npm",
    score: 76,
    downloads: "1.1M weekly",
    unresolvedRatio: "21% unresolved",
    activity: "7 commits this month",
    category: "Authentication",
  },
];

export default function SearchPage() {
  const hasResults = results.length > 0;

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[#7C3AED]">Search</p>
        <h2 className="text-3xl font-light text-white">Explore packages with faceted intelligence filters.</h2>
        <p className="max-w-3xl text-sm text-[#a1a1a1]">Filter by language, category, release recency, maintainer count, download tier, unresolved Q&A ratio, and repository activity thresholds.</p>
      </section>

      <SearchBar />
      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <FilterPanel />
        <div className="space-y-4">
          <Card title="Results" description="SWR-backed package discovery results.">
            {hasResults ? (
              <div className="space-y-4">
                {results.map((result) => (
                  <PackageResultCard key={result.name} {...result} />
                ))}
              </div>
            ) : (
              <EmptyState title="No packages found" description="Try broadening your filters or search terms." />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
