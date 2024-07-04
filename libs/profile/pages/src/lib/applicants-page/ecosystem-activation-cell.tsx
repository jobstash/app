import { useEffect, useState } from 'react';

import { Chip, Spinner } from '@nextui-org/react';
import { useReadContract } from 'wagmi';

import { COMMUNITY_NFT_ADDRESSES } from '@jobstash/profile/core';
import { cn } from '@jobstash/shared/utils';

import { EmptyCellPlaceholder } from '@jobstash/profile/ui';
import { Text } from '@jobstash/shared/ui';

import { CellProps } from './types';

const FUNCTION_NAME = 'balanceOf';
const COMMUNITY_KEYS = Object.keys(COMMUNITY_NFT_ADDRESSES) as CommunityKey[];
type CommunityKey = keyof typeof COMMUNITY_NFT_ADDRESSES;

export const ABI = [
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
] as const;

interface CommunityProps {
  communityKey: CommunityKey;
  wallet: string;
  incrementFetched: () => void;
  incrementCommunities: () => void;
}

const CommunityFetcher = ({
  communityKey,
  wallet,
  incrementFetched,
  incrementCommunities,
}: CommunityProps) => {
  const [initialized, setInitialized] = useState(false);

  const { address, label, chainId } = COMMUNITY_NFT_ADDRESSES[communityKey];

  const { data, isError, isSuccess } = useReadContract({
    abi: ABI,
    address,
    functionName: FUNCTION_NAME,
    args: [wallet as `0x${string}`],
    chainId,
  });

  const hasLoaded = isError || isSuccess;
  const hasAsset = Number(data) > 0;

  useEffect(() => {
    if (!initialized && hasLoaded) {
      setInitialized(true);
      incrementFetched();
      if (hasAsset) {
        incrementCommunities();
      }
    }
  }, [
    hasAsset,
    hasLoaded,
    incrementCommunities,
    incrementFetched,
    initialized,
  ]);

  if (!hasAsset) return null;

  return (
    <Chip>
      <Text fw="bold">{label}</Text>
    </Chip>
  );
};

export const EcosystemActivationsCell = ({ data }: CellProps) => {
  const [counts, setCounts] = useState({
    fetched: 0,
    communities: 0,
  });

  if (!data) return <EmptyCellPlaceholder isCentered />;

  const {
    user: { wallet },
  } = data;

  const incrementFetched = () =>
    setCounts((prev) => ({ ...prev, fetched: prev.fetched + 1 }));

  const incrementCommunities = () =>
    setCounts((prev) => ({ ...prev, communities: prev.communities + 1 }));

  const isLoading = counts.fetched < COMMUNITY_KEYS.length;
  const hasNoCommunity = counts.communities === 0;

  return (
    <div className="w-full flex h-max">
      <div className={cn({ hidden: !isLoading })}>
        <Spinner size="sm" color="white" />
      </div>

      {!isLoading && hasNoCommunity && <EmptyCellPlaceholder />}

      <div
        className={cn('flex flex-col gap-1 self-start', { hidden: isLoading })}
      >
        {COMMUNITY_KEYS.map((communityKey) => (
          <CommunityFetcher
            key={communityKey}
            communityKey={communityKey}
            wallet={wallet}
            incrementFetched={incrementFetched}
            incrementCommunities={incrementCommunities}
          />
        ))}
      </div>
    </div>
  );
};
