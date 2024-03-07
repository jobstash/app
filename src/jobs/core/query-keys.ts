export const jobQueryKeys = {
  all: ['jobs'] as const,
  details: (id: string) => [...jobQueryKeys.all, 'details', id] as const,
  list: (params: string | Record<string, string>) => {
    const searchParams =
      typeof params === 'string'
        ? params
        : new URLSearchParams(params).toString();

    return [...jobQueryKeys.all, 'list', searchParams] as const;
  },
};
export type JobQueryKeys = typeof jobQueryKeys;
