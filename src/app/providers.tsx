"use client";

import type { ReactNode } from "react";

import { SWRConfig } from "swr";

import { fetcher } from "@/lib/api";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
}
