import { type ProfileInfo, profileInfoSchema } from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getProfileInfo = async () => {
  const url = `${MW_URL}/profile/info`;

  const options = {
    responseSchema: profileInfoSchema,
    sentryLabel: `getProfileInfo`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<ProfileInfo>(url, options);
};
