export const orgQueryKeys = {
  all: ['orgs'] as const,
  details: (orgId: string) => [...orgQueryKeys.all, 'details', orgId] as const,
};

export type OrgQueryKeys = typeof orgQueryKeys;
