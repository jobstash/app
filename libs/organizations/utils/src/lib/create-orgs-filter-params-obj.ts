import { ParsedUrlQuery } from 'node:querystring';

import { orgDynamicSlugSet } from '@jobstash/organizations/core';
import { createFilterParamsObj } from '@jobstash/filters/utils';

export const createOrgsFilterParamsObj = (query: ParsedUrlQuery) =>
  createFilterParamsObj(query, orgDynamicSlugSet);
