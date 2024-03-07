import { RouteSection } from '~/shared/core/constants';
import { MW_URL } from '~/shared/core/envs';
import { mwGET } from '~/shared/utils/mw-get';

import { filterConfigResponseSchema } from '~/filters/core/schemas';

export const getFilterConfig = async (path: `/${RouteSection}`) => {
  const url = `${MW_URL}${path}/filters`;

  return mwGET({
    url,
    label: 'getFilterConfig',
    responseSchema: filterConfigResponseSchema,
    options: { next: { revalidate: 60 * 60 } },
  });
};
