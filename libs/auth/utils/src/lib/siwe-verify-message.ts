import type { SIWEConfig } from 'connectkit/build/siwe';

import { NEXT_PUBLIC_MW_URL } from '@jobstash/shared/core';

export const siweVerifyMessage: SIWEConfig['verifyMessage'] = async ({
  message,
  signature,
}) => {
  const res = await fetch(`${NEXT_PUBLIC_MW_URL}/siwe/verify`, {
    credentials: 'include',
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, signature }),
  });

  return res.ok;
};
