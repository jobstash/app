import myzod, { Infer } from 'myzod';

import { MW_URL, tagSchema } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getPopularSkills = async (count: number) => {
  const url = `${MW_URL}/tags/popular/${count}`;

  const options = {
    responseSchema,
    sentryLabel: `getPopularSkills`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const { success, message, data } = await mwFetch<
    Infer<typeof responseSchema>
  >(url, options);

  if (!success) throw new Error(message);

  return data;
};

const responseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string(),
  data: myzod.array(tagSchema),
});
