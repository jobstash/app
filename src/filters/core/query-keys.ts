import { RouteSection } from '~/shared/core/constants';

export const filterQueryKeys = {
  all: ['filters'] as const,
  // Filter config for
  list: (params: string | Record<string, string>, section: RouteSection) => {
    const searchParams =
      typeof params === 'string'
        ? params
        : new URLSearchParams(params).toString();

    return [...filterQueryKeys.all, section, searchParams] as const;
  },
};
