import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '~/shared/core/constants';

import { userQueryKeys } from '~/users/core/query-keys';
import { getWalletData } from '~/users/api/get-wallet-data';

export const useWalletData = () => {
  return useQuery({
    queryKey: userQueryKeys.walletData(),
    queryFn: () => getWalletData(),
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};
