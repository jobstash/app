import { ParsedUrlQuery } from 'node:querystring';

import { projectDynamicSlugSet } from '@jobstash/projects/core';
import { createFilterParamsObj } from '@jobstash/filters/utils';

export const createProjectsFilterParamsObj = (query: ParsedUrlQuery) =>
  createFilterParamsObj(query, projectDynamicSlugSet);
