import { Badge } from "@/components/ui/badge";

interface FacetChipProps {
  label: string;
  active?: boolean;
}

export function FacetChip({ label, active }: FacetChipProps) {
  return <Badge tone={active ? "info" : "default"}>{label}</Badge>;
}
