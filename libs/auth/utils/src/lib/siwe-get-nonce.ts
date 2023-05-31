import type { SIWEConfig } from 'connectkit/build/siwe';

import { getMwUrl } from '@jobstash/shared/utils';

export const siweGetNonce: SIWEConfig['getNonce'] = async () => {
  const mwUrl = getMwUrl();

  const res = await fetch(`${mwUrl}/siwe/nonce`, {
    credentials: 'include',
    mode: 'cors',
  });

  const { data } = await res.json();
  return data;
};
