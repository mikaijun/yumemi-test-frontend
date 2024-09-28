"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

const queryClient = new QueryClient();
/**
 * TanStack Queryはクライアントサイドのみ対応のため
 * ReactQueryStreamedHydrationを使ってサーバーサイドでラップする
 * @see https://tanstack.com/query/v5/docs/framework/react/guides/suspense#suspense-on-the-server-with-streaming
 */
export function ReactQueryProviders(props: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {props.children}
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
