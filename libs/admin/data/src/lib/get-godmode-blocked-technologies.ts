import {
  type GodmodeBlockedTechnologiesResponse,
  godmodeBlockedTechnologiesSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getGodmodeBlockedTechnologies = async () => {
  const url = `${MW_URL}/technologies/blocked-terms`;

  const options = {
    responseSchema: godmodeBlockedTechnologiesSchema,
    sentryLabel: `getGodmodeBlockedTechnologies`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const { data } = await mwFetch<GodmodeBlockedTechnologiesResponse>(
    url,
    options,
  );

  return data.map((d) => d.name);
};
