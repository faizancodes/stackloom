export const APP_NAME = "Stackloom";
export const APP_DESCRIPTION =
  "Developer intelligence for package health, adoption, and support surface.";
export const ACCENT_COLOR = "#7C3AED";
export const API_TIMEOUT_MS = 15000;
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_COMPARISON_LIMIT = 3;
export const DEFAULT_ALERT_RULES = [
  {
    id: "maintenance-lag",
    name: "Maintenance lag",
    packageName: "react-query",
    slug: "react-query",
    ecosystem: "npm",
    metric: "commitInactivity",
    threshold: 14,
    operator: "above",
    enabled: true,
    lastTriggeredAt: "2026-03-27T10:30:00.000Z",
  },
  {
    id: "bus-factor-risk",
    name: "Bus factor risk",
    packageName: "vite",
    slug: "vite",
    ecosystem: "npm",
    metric: "maintenanceScore",
    threshold: 55,
    operator: "below",
    enabled: true,
    lastTriggeredAt: "2026-03-26T16:15:00.000Z",
  },
  {
    id: "support-debt",
    name: "Support debt",
    packageName: "next",
    slug: "next",
    ecosystem: "npm",
    metric: "unresolvedRatio",
    threshold: 35,
    operator: "above",
    enabled: true,
    lastTriggeredAt: "2026-03-28T08:00:00.000Z",
  },
] as const;
