import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onRetry?: () => void;
  children?: ReactNode;
}

export function ErrorState({ title = "Something went wrong", message = "Please try again.", actionLabel = "Retry", onRetry, children }: ErrorStateProps) {
  return (
    <div className="rounded-none border border-[#222222] bg-[#111111] p-6 text-[#a1a1a1]">
      <h3 className="text-lg font-light text-white">{title}</h3>
      <p className="mt-2 text-sm">{message}</p>
      {children}
      {onRetry ? (
        <div className="mt-4">
          <Button onClick={onRetry}>{actionLabel}</Button>
        </div>
      ) : null}
    </div>
  );
}
