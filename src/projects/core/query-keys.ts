export const projectQueryKeys = {
  all: ['orgs'] as const,
  competitors: (projectId: string) =>
    [...projectQueryKeys.all, 'competitors', projectId] as const,
};
