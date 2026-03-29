import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({ className, children, variant = "primary", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-[var(--accent)] text-[#0a0a0a] hover:bg-[#6D28D9]",
    secondary: "bg-[#111111] text-white border border-[#222222] hover:border-[#333333]",
    ghost: "bg-transparent text-[#a1a1a1] hover:text-white",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-[4px] px-4 py-2 text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-0",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
