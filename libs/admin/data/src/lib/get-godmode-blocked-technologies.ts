import {
  type GodmodeBlockedTechnologiesResponse,
  godmodeBlockedTechnologiesResponseSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getGodmodeBlockedTechnologies = async () => {
  const url = `${MW_URL}/technologies/blocked-terms`;

  const options = {
    responseSchema: godmodeBlockedTechnologiesResponseSchema,
    sentryLabel: `getGodmodeBlockedTechnologies`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<GodmodeBlockedTechnologiesResponse>(
    url,
    options,
  );

  return response.data.map((d) => d.name);
};
