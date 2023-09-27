import {
  type BlockedTechnologiesResponse,
  blockedTechnologiesResponseSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getBlockedTechnologies = async () => {
  const url = `${MW_URL}/technologies/blocked-terms`;

  const options = {
    responseSchema: blockedTechnologiesResponseSchema,
    sentryLabel: `getGodmodeBlockedTechnologies`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<BlockedTechnologiesResponse>(url, options);

  return response.data.map((t) => t.name);
};
