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

  const { data } = await mwFetch<GodmodeTechnologiesResponse>(url, options);

  return data.map((d) => d.name);
};
