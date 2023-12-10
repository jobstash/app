import { ERR_INTERNAL, MW_URL } from '@jobstash/shared/core';

export const sendMagicLink = async (destination: string) => {
  const { ok } = await fetch(`${MW_URL}/auth/magic/login`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ destination }),
  });

  if (!ok) {
    throw new Error(ERR_INTERNAL);
  }
};
