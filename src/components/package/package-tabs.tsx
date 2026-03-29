import Link from "next/link";

import { cn } from "@/lib/utils";

interface PackageTabsProps {
  slug: string;
  activeTab: string;
}

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "activity", label: "Activity" },
  { key: "support", label: "Support" },
  { key: "dependencies", label: "Dependencies" },
];

export function PackageTabs({ slug, activeTab }: PackageTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-[#222222] pb-4">
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <Link
            key={tab.key}
            href={`/package/${slug}?tab=${tab.key}`}
            className={cn(
              "rounded-[4px] border px-3 py-2 text-sm transition-colors",
              isActive ? "border-[#7C3AED] bg-[#10162a] text-white" : "border-[#222222] bg-[#0f0f0f] text-[#a1a1a1] hover:border-[#333333] hover:text-white",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
