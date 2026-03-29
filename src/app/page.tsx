import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

const highlights = [
  {
    title: "Multi-signal package intelligence",
    description: "Cross-reference GitHub activity, npm trends, and StackExchange support volume in one view.",
  },
  {
    title: "Risk and momentum scorecards",
    description: "Spot maintenance lag, adoption acceleration, contributor concentration, and support debt quickly.",
  },
  {
    title: "Comparison and alert workflows",
    description: "Evaluate packages side by side and create alerts for the signals that matter to your team.",
  },
];

const metrics = [
  { label: "GitHub", value: "Commit cadence, issue churn, contributor concentration" },
  { label: "npm", value: "Downloads, version velocity, dependency graph" },
  { label: "StackExchange", value: "Question volume, recency, unresolved rate" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 lg:px-8">
        <div className="mb-8 inline-flex w-fit items-center rounded-full border border-[#222222] bg-[#111111] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#a1a1a1]">
          {APP_NAME}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Developer intelligence for open-source package decisions.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#a1a1a1]">
              {APP_DESCRIPTION} Stackloom helps engineering leaders, maintainers, and researchers evaluate real-world health,
              adoption, and support surface before committing to a dependency.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button>
                <Link href="/dashboard">Open dashboard</Link>
              </Button>
              <Button variant="secondary">
                <Link href="/search">Search packages</Link>
              </Button>
            </div>
          </div>

          <Card title="Signal coverage" description="A unified view of the ecosystem signals Stackloom tracks.">
            <div className="space-y-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-none border border-[#222222] bg-[#0f0f0f] p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#666666]">{metric.label}</div>
                  <p className="mt-2 text-sm leading-6 text-white">{metric.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.title} title={item.title} description={item.description}>
              <div className="h-24 rounded-none border border-dashed border-[#222222] bg-[#0f0f0f]" />
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
