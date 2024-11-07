import {
  OrgJobListQueryPage,
  orgJobListQueryPageSchema,
} from '@jobstash/organizations/core';
import { MW_URL, PAGE_SIZE } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

interface Props {
  id: string;
  page: number;
  limit?: number;
}

export const getOrgJobList = async ({
  id,
  page,
  limit,
}: Props): Promise<OrgJobListQueryPage> => {
  const url = `${MW_URL}/jobs/org/${id}/all?page=${page}&limit=${
    limit ?? PAGE_SIZE
  }`;

  const options = {
    responseSchema: orgJobListQueryPageSchema,
    sentryLabel: 'getJobList',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<OrgJobListQueryPage>(url.toString(), options);
};
