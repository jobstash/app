import { MW_URL, PAGE_SIZE } from '~/shared/core/envs';
import { createUrlWithSearchParams } from '~/shared/utils/create-url-with-search-params';
import { mwGET } from '~/shared/utils/mw-get';

import { jobListQueryPageSchema } from '~/jobs/core/schemas';

export const getJobList = async (
  pageNum: number,
  searchParams: string | Record<string, string>,
) => {
  const url = createUrlWithSearchParams(
    `${MW_URL}/jobs/list?page=${pageNum}&limit=${PAGE_SIZE}`,
    searchParams,
  );

  return mwGET({
    url,
    label: 'getJobList',
    responseSchema: jobListQueryPageSchema,
    options: { next: { revalidate: 60 * 60 } },
  });
};
