import type { SIWEConfig } from 'connectkit/build/siwe';

import { getMwUrl } from '@jobstash/shared/utils';

export const siweVerifyMessage: SIWEConfig['verifyMessage'] = async ({
  message,
  signature,
}) => {
  const mwUrl = getMwUrl();

  const res = await fetch(`${mwUrl}/siwe/verify`, {
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
