import type { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  message?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function EmptyState({ title = "No results", description, message, icon, className, children }: EmptyStateProps) {
  return (
    <div className={className ?? "rounded-none border border-[#222222] bg-[#111111] p-6 text-center text-[#a1a1a1]"}>
      {icon ? <div className="mb-3 flex justify-center text-[#7C3AED]">{icon}</div> : null}
      <h3 className="text-lg font-light text-white">{title}</h3>
      {description ? <p className="mt-2 text-sm">{description}</p> : null}
      {message ? <p className="mt-2 text-sm">{message}</p> : null}
      {children}
    </div>
  );
}
