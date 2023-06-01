import { type ParsedUrlQuery } from 'node:querystring';

import { jobsDynamicSlugSet } from '@jobstash/jobs/core';

export const createFilterParamsObj = (query: ParsedUrlQuery) => {
  const filterParamsObj: Record<string, string> = {};
  for (const [key, value] of Object.entries(query)) {
    if (value && !jobsDynamicSlugSet.has(key)) {
      filterParamsObj[key] = value.toString();
    }
  }

  return filterParamsObj;
};
