import { MW_URL } from '~/shared/core/envs';
import { mwGET } from '~/shared/utils/mw-get';

import { candidateOrgReviewsResponseSchema } from '~/users/core/schemas';

export const getCandidateOrgReviews = async () => {
  const res = await mwGET({
    url: `${MW_URL}/profile/organizations`,
    label: 'getCandidateOrgReviews',
    responseSchema: candidateOrgReviewsResponseSchema,
    options: {
      credentials: 'include' as RequestCredentials,
      mode: 'cors' as RequestMode,
    },
  });

  return res.data;
};
