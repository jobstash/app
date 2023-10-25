import { FILTER_KIND, FilterConfig } from '@jobstash/filters/core';

export const getMultiSelectKeysSet = (
  filterConfig: FilterConfig | null,
): Set<string> => {
  const multiSelectKeys = new Set<string>();
  const filterConfigEntries = Object.entries(filterConfig ?? []);
  for (const [key, value] of filterConfigEntries) {
    if (
      value.kind === FILTER_KIND.MULTI_SELECT ||
      value.kind === FILTER_KIND.MULTI_SELECT_WITH_SEARCH
    ) {
      multiSelectKeys.add(key);
    }
  }

  return multiSelectKeys;
};
