import { create } from "zustand";

import type { ComparisonState, PackageIdentifier, SearchFilters } from "@/lib/types";

interface StackloomState {
  filters: SearchFilters;
  selectedPackage: PackageIdentifier | null;
  comparison: ComparisonState;
  setFilters: (filters: Partial<SearchFilters>) => void;
  setSelectedPackage: (pkg: PackageIdentifier | null) => void;
  addComparisonPackage: (pkg: PackageIdentifier) => void;
  removeComparisonPackage: (slug: string) => void;
  resetComparison: () => void;
}

const defaultFilters: SearchFilters = {
  query: "",
  ecosystem: "all",
  sortBy: "score",
  minScore: 0,
};

export const useStackloomStore = create<StackloomState>((set) => ({
  filters: defaultFilters,
  selectedPackage: null,
  comparison: { selectedPackages: [] },
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
}));
