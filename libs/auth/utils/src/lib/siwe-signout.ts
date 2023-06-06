import type { SIWEConfig } from 'connectkit/build/siwe';

import { MW_URL } from '@jobstash/shared/core';

export const siweSignOut: SIWEConfig['signOut'] = async () => {
  const res = await fetch(`${MW_URL}/siwe/logout`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.ok;
};
