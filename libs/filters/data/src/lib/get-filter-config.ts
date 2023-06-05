import { type FilterConfig, filterConfigSchema } from '@jobstash/filters/core';
import { getMwUrl } from '@jobstash/shared/utils';

import { mwFetch } from '@jobstash/shared/data';

export const getFilterConfig = async (): Promise<FilterConfig> => {
  const mwUrl = getMwUrl();
  const url = `${mwUrl}/jobs/filters`;
  const options = {
    responseSchema: filterConfigSchema,
    sentryLabel: 'getFilterConfig',
  };

  return mwFetch<FilterConfig>(url, options);
};
