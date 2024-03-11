export const orgQueryKeys = {
  all: ['orgs'] as const,
  details: (orgId: string) => [...orgQueryKeys.all, 'details', orgId] as const,
  list: (params: string | Record<string, string>) => {
    const searchParams =
      typeof params === 'string'
        ? params
        : new URLSearchParams(params).toString();

    return [...orgQueryKeys.all, 'list', searchParams] as const;
  },
};

export type OrgQueryKeys = typeof orgQueryKeys;
