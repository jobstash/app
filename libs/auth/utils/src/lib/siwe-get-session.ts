import type { SIWEConfig } from 'connectkit/build/siwe';

import { getMwUrl } from '@jobstash/shared/utils';

export const siweGetSession: SIWEConfig['getSession'] = async () => {
  const mwUrl = getMwUrl();

  const res = await fetch(`${mwUrl}/siwe/session`, {
    mode: 'cors',
    credentials: 'include',
  });

  if (!res.ok) return null;

  const { data } = await res.json();

  return data;
};
