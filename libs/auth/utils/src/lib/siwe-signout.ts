import type { SIWEConfig } from 'connectkit/build/siwe';

import { getMwUrl } from '@jobstash/shared/utils';

export const siweSignOut: SIWEConfig['signOut'] = async () => {
  const mwUrl = getMwUrl();

  const res = await fetch(`${mwUrl}/siwe/logout`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.ok;
};
