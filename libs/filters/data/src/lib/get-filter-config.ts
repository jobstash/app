import { type FilterConfig, filterConfigSchema } from '@jobstash/filters/core';
import { MW_URL, type RouteSection } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getFilterConfig = async (routeSection: RouteSection) => {
  const url = `${MW_URL}${routeSection}/filters`;
  const options = {
    responseSchema: filterConfigSchema,
    sentryLabel: 'getFilterConfig',
  };

  return mwFetch<FilterConfig>(url, options);
};
