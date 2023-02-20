import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    // ✅ no more errors on the console for tests
    error: process.env['NODE_ENV'] === 'test' ? () => ({}) : console.error,
  },
  defaultOptions: {
    queries: {
      // All request become stale immediately
      staleTime: 0,
      // Turn retries off
      retry: false,
      // Do not cache result
      cacheTime: 0,
    },
    mutations: {
      // Turn retries off
      retry: false,
    },
  },
});

export const DataTestWrapper = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
