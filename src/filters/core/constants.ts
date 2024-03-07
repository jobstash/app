export const FILTER_KIND = {
  RANGE: 'RANGE' as const,
  SINGLE_SELECT: 'SINGLE_SELECT' as const,
  MULTI_SELECT: 'MULTI_SELECT' as const,
  MULTI_SELECT_WITH_SEARCH: 'MULTI_SELECT_WITH_SEARCH' as const,
} as const;
export type FilterKind = (typeof FILTER_KIND)[keyof typeof FILTER_KIND];

export const QUERY_PARAM_KEY = 'query';
