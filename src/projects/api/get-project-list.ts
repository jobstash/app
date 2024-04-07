import { MW_URL, PAGE_SIZE } from '~/shared/core/envs';
import { createUrlWithSearchParams } from '~/shared/utils/create-url-with-search-params';
import { mwGET } from '~/shared/utils/mw-get';

import { projectListQueryPageSchema } from '~/projects/core/schemas';

interface Props {
  page: number;
  searchParams: string | Record<string, string>;
}

export const getProjectList = ({ page, searchParams }: Props) => {
  const url = createUrlWithSearchParams(
    `${MW_URL}/organizations/list?page=${page}&limit=${PAGE_SIZE}`,
    searchParams,
  );

  return mwGET({
    url,
    label: 'getProjectList',
    responseSchema: projectListQueryPageSchema,
    options: { next: { revalidate: 60 * 60 } },
  });
};
