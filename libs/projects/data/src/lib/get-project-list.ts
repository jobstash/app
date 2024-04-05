import {
  type ProjectListQueryPage,
  projectListQueryPageSchema,
} from '@jobstash/projects/core';
import { MW_URL, PAGE_SIZE } from '@jobstash/shared/core';
import { getUrlWithParams } from '@jobstash/filters/utils';
import { getEcosystemHeader } from '@jobstash/shared/utils';

import { mwFetch } from '@jobstash/shared/data';

interface Props {
  page: number;
  filterParams: Record<string, string>;
  ssrHost?: string;
}

export const getProjectList = async ({
  page,
  filterParams,
  ssrHost,
}: Props): Promise<ProjectListQueryPage> => {
  const params: Record<string, string> = {
    ...filterParams,
    page: page.toString(),
    limit: PAGE_SIZE,
  };

  const url = getUrlWithParams(MW_URL, '/projects/list', params);

  const options = {
    responseSchema: projectListQueryPageSchema,
    sentryLabel: 'getProjectList',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    headers: {
      ...getEcosystemHeader(ssrHost),
    },
  };

  return mwFetch<ProjectListQueryPage>(url, options);
};
