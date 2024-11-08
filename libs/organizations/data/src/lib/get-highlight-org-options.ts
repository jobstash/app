import myzod, { Infer } from 'myzod';

import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getHighlightOrgOptions = async () => {
  const url = `${MW_URL}/organizations/all`;

  const options = {
    responseSchema,
    sentryLabel: `getHighlightOrgOptions`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<HighlightOrgOptionsResponse>(url, options);
};

const responseSchema = myzod.array(
  myzod.object({
    orgId: myzod.string(),
    name: myzod.string(),
  }),
);
type HighlightOrgOptionsResponse = Infer<typeof responseSchema>;
