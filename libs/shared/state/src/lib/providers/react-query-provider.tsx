import { type ReactNode, useState } from 'react';

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

interface Props {
  children: ReactNode;
  dehydratedState: unknown;
}

const ReactQueryProvider = ({ children, dehydratedState }: Props) => {
  // eslint-disable-next-line react/hook-use-state
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: Number(process.env.NEXT_PUBLIC_QUERY_RETRY_COUNT) || false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
