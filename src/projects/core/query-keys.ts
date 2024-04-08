export const projectQueryKeys = {
  all: ['projects'] as const,
  details: (projectId: string) =>
    [...projectQueryKeys.all, 'details', projectId] as const,
  list: (params: string | Record<string, string>) => {
    const searchParams =
      typeof params === 'string'
        ? params
        : new URLSearchParams(params).toString();

    return [...projectQueryKeys.all, 'list', searchParams] as const;
  },
  competitors: (projectId: string) =>
    [...projectQueryKeys.all, 'competitors', projectId] as const,
};

export type ProjectQueryKeys = typeof projectQueryKeys;
