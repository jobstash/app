import {
  type PairedTermsResponse,
  pairedTermsResponseSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getPairedTerms = async () => {
  const url = `${MW_URL}/tags/paired-terms`;

  const options = {
    responseSchema: pairedTermsResponseSchema,
    sentryLabel: `getPairedTerms`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<PairedTermsResponse>(url, options);

  return response.data;
};
