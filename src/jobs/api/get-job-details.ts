import { MW_URL } from '~/shared/core/envs';
import { mwGET } from '~/shared/utils/mw-get';

import { jobDetailsSchema } from '~/jobs/core/schemas';

export const getJobDetails = async (id: string) => {
  const url = `${MW_URL}/jobs/details/${id}`;

  return mwGET({
    url,
    label: 'getJobDetails',
    responseSchema: jobDetailsSchema,
    options: { next: { revalidate: 60 * 60 } },
  });
};
