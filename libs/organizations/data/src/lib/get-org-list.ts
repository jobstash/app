import {
  OrgListQueryPage,
  orgListQueryPageSchema,
} from '@jobstash/organizations/core';
import { MW_URL, PAGE_SIZE } from '@jobstash/shared/core';
import { getUrlWithParams } from '@jobstash/filters/utils';

import { mwFetch } from '@jobstash/shared/data';

export const getOrgList = async (
  page: number,
  filterParams?: Record<string, string>,
  limit?: number,
): Promise<OrgListQueryPage> => {
  const params: Record<string, string> = {
    ...filterParams,
    page: page.toString(),
    limit: limit?.toString() ?? PAGE_SIZE,
  };

  const url = getUrlWithParams(MW_URL, '/organizations/list', params);

  const options = {
    responseSchema: orgListQueryPageSchema,
    sentryLabel: 'getOrgList',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<OrgListQueryPage>(url, options);
};