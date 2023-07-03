import {
  type FilterConfig,
  filterConfigSchema,
  type FilterSection,
} from '@jobstash/filters/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getFilterConfig = async (filterSection: FilterSection) => {
  const url = `${MW_URL}/${filterSection}/filters`;
  const options = {
    responseSchema: filterConfigSchema,
    sentryLabel: 'getFilterConfig',
  };

  return mwFetch<FilterConfig>(url, options);
};
