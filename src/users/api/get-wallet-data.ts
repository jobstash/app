import { MW_URL } from '~/shared/core/envs';
import { mwGET } from '~/shared/utils/mw-get';

import { walletDataResponseSchema } from '~/users/core/schemas';

export const getWalletData = async () => {
  const url = `${MW_URL}/siwe/check-wallet`;

  return mwGET({
    url,
    label: 'getWalletData',
    responseSchema: walletDataResponseSchema,
    options: {
      credentials: 'include' as RequestCredentials,
      mode: 'cors' as RequestMode,
    },
  });
};
