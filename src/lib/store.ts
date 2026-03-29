import { create } from "zustand";

import { DEFAULT_ALERT_RULES } from "@/lib/constants";
import type { AlertItem, AlertRule, ComparisonState, PackageIdentifier, SearchFilters } from "@/lib/types";

interface StackloomState {
  filters: SearchFilters;
  selectedPackage: PackageIdentifier | null;
  comparison: ComparisonState;
  alertRules: AlertRule[];
  alertItems: AlertItem[];
  setFilters: (filters: Partial<SearchFilters>) => void;
  setSelectedPackage: (pkg: PackageIdentifier | null) => void;
  addComparisonPackage: (pkg: PackageIdentifier) => void;
  removeComparisonPackage: (slug: string) => void;
  resetComparison: () => void;
  addAlertRule: (rule: AlertRule) => void;
  toggleAlertRule: (id: string) => void;
}

const defaultFilters: SearchFilters = {
  query: "",
  ecosystem: "all",
  sortBy: "score",
  minScore: 0,
};

const defaultAlertItems: AlertItem[] = [
  {
    id: "alert-1",
    packageName: "react-query",
    slug: "react-query",
    ecosystem: "npm",
    title: "Maintenance lag exceeded threshold",
    description: "No commits have landed for 18 days while issue activity remains elevated.",
    metric: "commitInactivity",
    severity: "warning",
    value: "18 days",
    triggeredAt: "2026-03-28T09:00:00.000Z",
    thresholdLabel: "> 14 days",
  },
  {
    id: "alert-2",
    packageName: "vite",
    slug: "vite",
    ecosystem: "npm",
    title: "Support debt is rising",
    description: "Unresolved StackExchange questions now account for 42% of recent activity.",
    metric: "unresolvedRatio",
    severity: "error",
    value: "42% unresolved",
    triggeredAt: "2026-03-28T07:45:00.000Z",
    thresholdLabel: "> 35% unresolved",
  },
];

export const useStackloomStore = create<StackloomState>((set) => ({
  filters: defaultFilters,
  selectedPackage: null,
  comparison: { selectedPackages: [] },
  alertRules: [...DEFAULT_ALERT_RULES],
  alertItems: defaultAlertItems,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  setSelectedPackage: (pkg) => set({ selectedPackage: pkg }),
  addComparisonPackage: (pkg) =>
    set((state) => ({
      comparison: {
        selectedPackages: state.comparison.selectedPackages.some((item) => item.slug === pkg.slug)
          ? state.comparison.selectedPackages
          : [...state.comparison.selectedPackages, pkg],
      },
    })),
  removeComparisonPackage: (slug) =>
    set((state) => ({
      comparison: {
        selectedPackages: state.comparison.selectedPackages.filter((item) => item.slug !== slug),
      },
    })),
  resetComparison: () => set({ comparison: { selectedPackages: [] } }),
  addAlertRule: (rule) => set((state) => ({ alertRules: [rule, ...state.alertRules] })),
  toggleAlertRule: (id) =>
    set((state) => ({
      alertRules: state.alertRules.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)),
    })),
}));
