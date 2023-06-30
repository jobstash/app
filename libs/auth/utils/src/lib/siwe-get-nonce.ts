import type { SIWEConfig } from 'connectkit/build/siwe';

import { MW_URL } from '@jobstash/shared/core';

export const siweGetNonce: SIWEConfig['getNonce'] = async () => {
  const res = await fetch(`${MW_URL}/siwe/nonce`, {
    credentials: 'include',
    mode: 'cors',
  });

  const { data } = await res.json();
  return data;
};
