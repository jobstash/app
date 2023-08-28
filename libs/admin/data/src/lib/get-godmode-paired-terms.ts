import {
  type GodmodePairedTermsResponse,
  godmodePairedTermsResponseSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getGodmodePairedTerms = async () => {
  const url = `${MW_URL}/technologies/paired-terms`;

  const options = {
    responseSchema: godmodePairedTermsResponseSchema,
    sentryLabel: `getGodmodePairedTerms`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<GodmodePairedTermsResponse>(url, options);

  return response.data;
};
