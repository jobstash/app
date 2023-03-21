import type { SIWEConfig } from 'connectkit/build/siwe';

import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';

export const siweGetNonce: SIWEConfig['getNonce'] = async () => {
  const res = await fetch(`${NEXT_PUBLIC_MW_URL}/siwe/nonce`, {
    credentials: 'include',
    mode: 'cors',
  });

  const { data } = await res.json();
  return data;
};
