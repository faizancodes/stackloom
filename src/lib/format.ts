import { formatDistanceToNow, format } from "date-fns";

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}

export function formatDate(value: string) {
  return format(new Date(value), "MMM d, yyyy");
}

export function formatRelativeDate(value: string) {
  return formatDistanceToNow(new Date(value), { addSuffix: true });
}
