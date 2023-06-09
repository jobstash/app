import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getSiweLogout = async () => {
  const url = `${MW_URL}/siwe/logout`;

  const options = {
    sentryLabel: 'getSiweLogout',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<null>(url, options);
};
