import { MW_URL, PAGE_SIZE } from '~/shared/core/envs';

import { JOB_LIST_FIRST_PAGE_URL } from '~/jobs/core/constants';
import { JobListQueryPage } from '~/jobs/core/schemas';

export const jobListKeyFn = (
  _pageIndex: number,
  prev: JobListQueryPage | null,
) => {
  // Reached end
  if (prev && prev.page < 0) return null;

  // First page
  if (!prev) return JOB_LIST_FIRST_PAGE_URL;

  // Next page
  return `${MW_URL}/jobs/list?page=${prev.page + 1}&limit=${PAGE_SIZE}`;
};
