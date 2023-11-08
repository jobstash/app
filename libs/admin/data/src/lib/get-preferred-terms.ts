import {
  PreferredTermsResponse,
  preferredTermsResponseSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getPreferredTerms = async () => {
  const url = `${MW_URL}/tags/preferred`;

  const options = {
    responseSchema: preferredTermsResponseSchema,
    sentryLabel: `getPreferredTerms`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<PreferredTermsResponse>(url, options);

  return response.data;
};
