import { ERR_INTERNAL, MW_URL } from '@jobstash/shared/core';
import { sentryMessage } from '@jobstash/shared/utils';

export const getMwVersion = async () => {
  const url = `${MW_URL}/app/diff`;

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  });

  if (!res.ok) {
    sentryMessage('getMwVersion', JSON.stringify({ res }));
    throw new Error(ERR_INTERNAL);
  }

  return res.text();
};
