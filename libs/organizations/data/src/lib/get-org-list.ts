import {
  OrgListQueryPage,
  orgListQueryPageSchema,
} from '@jobstash/organizations/core';
import { MW_URL, PAGE_SIZE } from '@jobstash/shared/core';
import { getUrlWithParams } from '@jobstash/filters/utils';

import { mwFetch } from '@jobstash/shared/data';

export const getOrgList = async (
  page: number,
  filterParams: Record<string, string>,
): Promise<OrgListQueryPage> => {
  const params: Record<string, string> = {
    ...filterParams,
    page: page.toString(),
    limit: PAGE_SIZE,
  };

  const url = getUrlWithParams(MW_URL, '/organizations/list', params);

  const options = {
    responseSchema: orgListQueryPageSchema,
    sentryLabel: 'getOrgList',
  };

  return mwFetch<OrgListQueryPage>(url, options);
};
