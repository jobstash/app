import { MW_URL } from '~/shared/core/envs';
import { mwGET } from '~/shared/utils/mw-get';

import { orgDetailsSchema } from '~/orgs/core/schemas';

const label = 'getOrgDetails';

export const getOrgDetails = async (orgId: string) => {
  const url = `${MW_URL}/organizations/details/${orgId}`;

  return mwGET({
    url,
    label,
    responseSchema: orgDetailsSchema,
    options: { next: { revalidate: 60 * 60 } },
  });
};
