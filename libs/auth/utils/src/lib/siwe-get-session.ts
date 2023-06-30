import type { SIWEConfig } from 'connectkit/build/siwe';

import { MW_URL } from '@jobstash/shared/core';

export const siweGetSession: SIWEConfig['getSession'] = async () => {
  const res = await fetch(`${MW_URL}/siwe/session`, {
    mode: 'cors',
    credentials: 'include',
  });

  if (!res.ok) return null;

  const { data } = await res.json();

  return data;
};
