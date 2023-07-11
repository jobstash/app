import {
  type ProjectListQueryPage,
  projectListQueryPageSchema,
} from '@jobstash/projects/core';
import { MW_URL, PAGE_SIZE } from '@jobstash/shared/core';
import { getUrlWithParams } from '@jobstash/filters/utils';

import { mwFetch } from '@jobstash/shared/data';

export const getProjectList = async (
  page: number,
  filterParams: Record<string, string>,
): Promise<ProjectListQueryPage> => {
  const params: Record<string, string> = {
    ...filterParams,
    page: page.toString(),
    limit: PAGE_SIZE,
  };

  const url = getUrlWithParams(MW_URL, '/projects/list', params);

  const options = {
    responseSchema: projectListQueryPageSchema,
    sentryLabel: 'getProjectList',
  };

  return mwFetch<ProjectListQueryPage>(url, options);
};
