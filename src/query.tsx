"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { PropsWithChildren } from "react";

export const queryClient = new QueryClient();

export function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export function QueryDevtools() {
  const isDevtoolsEnabled = process.env.NEXT_PUBLIC_QUERY_DEVTOOLS === "true";

  if (!isDevtoolsEnabled) return null;

  return <ReactQueryDevtools initialIsOpen={false} />;
}
