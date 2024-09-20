import { usePrivy } from '@privy-io/react-auth';
import { useQuery } from '@tanstack/react-query';

import { formatWalletAddress } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getDevProfileInfo } from '@jobstash/profile/data';

import { useEnsInfo } from './use-ens-info';
import { useLinkedWallets } from './use-linked-wallets';

export const useSessionInfo = () => {
  const { user } = usePrivy();
  const { isLoading: isLoadingEns, ensName, ensAvatar } = useEnsInfo();
  const wallets = useLinkedWallets() as string[];

  const { mwVersion } = useMwVersionContext();
  const { isLoading: isLoadingProfileInfo, data: profileInfoData } = useQuery({
    queryKey: [mwVersion, 'dev-profile-info'],
    queryFn: () => getDevProfileInfo(),
  });

  if (!user) return { isLoading: false, name: null, avatar: null };

  const accountInfos = [
    { name: ensName, avatar: ensAvatar },
    { name: user.github?.name, avatar: profileInfoData?.githubAvatar },
    { name: user.email?.address, avatar: null },
    { name: user.google?.email, avatar: null },
    { name: user.farcaster?.username, avatar: user.farcaster?.pfp },
    ...wallets.map((wallet) => ({
      name: formatWalletAddress(wallet),
      avatar: null,
    })),
  ];

  const isLoading = isLoadingEns || isLoadingProfileInfo;

  return {
    isLoading,
    ...getFirstNonNullValue(accountInfos),
  };
};

type AccountInfo = {
  name: string | null | undefined;
  avatar: string | null | undefined;
};

const getFirstNonNullValue = (values: AccountInfo[]) => {
  for (const { name, avatar } of values) {
    if (name) {
      return { name, avatar };
    }
  }

  return { text: null, avatar: null };
};
