import { type ParsedUrlQuery } from 'node:querystring';

import { jobsDynamicSlugSet } from '@jobstash/jobs/core';
import { createFilterParamsObj } from '@jobstash/filters/utils';

export const createJobsFilterParamsObj = (query: ParsedUrlQuery) =>
  createFilterParamsObj(query, jobsDynamicSlugSet);
