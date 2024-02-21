import { MW_URL } from '@jobstash/shared/core';

export const sendMagicLink = async (
  destination: string,
  userType: 'dev' | 'org',
) => {
  const res = await fetch(`${MW_URL}/auth/magic/${userType}/login`, {
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
