import type { SIWEConfig } from 'connectkit/build/siwe';

import { NEXT_PUBLIC_MW_URL } from '@jobstash/shared/core';

export const siweGetSession: SIWEConfig['getSession'] = async () => {
  const res = await fetch(`${NEXT_PUBLIC_MW_URL}/siwe/session`, {
    mode: 'cors',
    credentials: 'include',
  });

  if (!res.ok) return null;

  const { data } = await res.json();

  return data;
};
