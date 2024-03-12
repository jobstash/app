// Client can just shove in any param key.

import { FILTER_KIND } from '~/filters/core/constants';
import {
  FilterConfig,
  MultiSelectFilterConfig,
  SingleSelectFilterConfig,
} from '~/filters/core/schemas';

// This gets param keys that are only from filter configs
export const sanitizeFilterParams = (
  rawSearchParams: string | Record<string, string>,
  filterConfigs: FilterConfig[],
) => {
  const urlParams = new URLSearchParams(rawSearchParams);

  const result = new URLSearchParams();

  // Search query
  if (urlParams.has(SEARCH_QUERY_KEY)) {
    result.set(SEARCH_QUERY_KEY, urlParams.get(SEARCH_QUERY_KEY)!);
  }

  // Filter config values
  for (const config of filterConfigs) {
    if (config.kind === FILTER_KIND.RANGE) {
      const {
        value: {
          lowest: { paramKey: minParamKey },
          highest: { paramKey: maxParamKey },
        },
      } = config;

      if (urlParams.has(minParamKey))
        result.set(minParamKey, urlParams.get(minParamKey)!);

      if (urlParams.has(maxParamKey))
        result.set(maxParamKey, urlParams.get(maxParamKey)!);
    }

    const isSelect = [
      config.kind === FILTER_KIND.SINGLE_SELECT,
      config.kind === FILTER_KIND.MULTI_SELECT,
      config.kind === FILTER_KIND.MULTI_SELECT_WITH_SEARCH,
    ].includes(true);
    if (isSelect) {
      const paramKey = (
        config as SingleSelectFilterConfig | MultiSelectFilterConfig
      ).paramKey;
      if (urlParams.has(paramKey)) {
        result.set(paramKey, urlParams.get(paramKey)!);
      }
    }
  }

  return result;
};

const SEARCH_QUERY_KEY = 'query';
