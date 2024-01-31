import { MW_URL } from '@jobstash/shared/core';

export const sendMagicLink = async (destination: string) => {
  const res = await fetch(`${MW_URL}/auth/magic/login`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ destination }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }
};
