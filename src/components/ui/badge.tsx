import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  tone?: "default" | "success" | "warning" | "error" | "info";
}

export function Badge({ children, className, tone = "default" }: BadgeProps) {
  const tones = {
    default: "bg-[#1a1a1a] text-[#a1a1a1]",
    success: "bg-[#0f1f14] text-[#22c55e]",
    warning: "bg-[#241a0a] text-[#f59e0b]",
    error: "bg-[#2a1111] text-[#ef4444]",
    info: "bg-[#10162a] text-[#3D56F0]",
  };

  return (
    <span className={cn("inline-flex rounded-[4px] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.05em]", tones[tone], className)}>
      {children}
    </span>
  );
}
