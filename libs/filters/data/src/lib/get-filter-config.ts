import { type FilterConfig, filterConfigSchema } from '@jobstash/filters/core';
import {
  MW_URL,
  ROUTE_SECTION,
  type RouteSection,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getFilterConfig = async (routeSection: RouteSection) => {
  // Crypto-native-jobs filter-configs are the same as jobs filter-configs
  const finalRouteSection =
    routeSection === ROUTE_SECTION.JOB_CONCIERGE
      ? ROUTE_SECTION.JOBS
      : routeSection;

  const url = `${MW_URL}${finalRouteSection}/filters`;

  const options = {
    responseSchema: filterConfigSchema,
    sentryLabel: 'getFilterConfig',
  };

  return mwFetch<FilterConfig>(url, options);
};
