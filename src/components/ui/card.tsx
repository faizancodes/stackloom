import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export function Card({ children, className, title, description }: CardProps) {
  return (
    <section className={cn("rounded-none border border-[#222222] bg-[#111111] p-6 transition-colors hover:border-[#333333]", className)}>
      {title ? <h3 className="text-lg font-light text-white">{title}</h3> : null}
      {description ? <p className="mt-1 text-sm text-[#a1a1a1]">{description}</p> : null}
      <div className={cn(title || description ? "mt-4" : undefined)}>{children}</div>
    </section>
  );
}
