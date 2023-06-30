import { type FilterConfig, filterConfigSchema } from '@jobstash/filters/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getFilterConfig = async (): Promise<FilterConfig> => {
  const url = `${MW_URL}/jobs/filters`;
  const options = {
    responseSchema: filterConfigSchema,
    sentryLabel: 'getFilterConfig',
  };

  return mwFetch<FilterConfig>(url, options);
};
