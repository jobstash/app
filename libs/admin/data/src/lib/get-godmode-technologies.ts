import {
  type GodmodeTechnologiesResponse,
  godmodeTechnologiesSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getGodmodeTechnologies = async () => {
  const url = `${MW_URL}/technologies`;

  const options = {
    responseSchema: godmodeTechnologiesSchema,
    sentryLabel: `getGodmodeTechnologies`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<GodmodeTechnologiesResponse>(url, options);

  return response.data.map((d) => d.name).slice(0, 5);
};
