'use client'; // AvatarGroup's renderCount cannot be serialized as rsc

import { useMemo } from 'react';

import { Avatar, AvatarGroup } from '@nextui-org/avatar';
import { Tooltip } from '@nextui-org/tooltip';

import { Chain } from '~/shared/core/schemas';
import { getPluralText } from '~/shared/utils/get-plural-text';
import { useIsMobile, useIsXs } from '~/shared/hooks/use-media-query';

import { ChainsIcon } from './icons/chains-icon';
import { InfoTag } from './info-tag';
import { Text } from './text';

interface Props {
  chains: Chain[];
  max?: number;
}

export const ChainsInfoTag = ({ chains, max }: Props) => {
  const isXs = useIsXs();
  const isSm = useIsMobile();

  const maxChainCount = useMemo(() => {
    if (max) return max;
    if (isXs) return CHAIN_COUNTS.XS;
    if (isSm) return CHAIN_COUNTS.SM;
    return CHAIN_COUNTS.DEFAULT;
  }, [max, isXs, isSm]);

  if (!chains.length) return null;

  return (
    <div className="flex items-center gap-1">
      <InfoTag compact tag={{ text: 'Chains:', icon: <ChainsIcon /> }} />

      <AvatarGroup
        max={maxChainCount}
        renderCount={(count) => <AvatarGroupCount count={count} />}
      >
        {chains.map(({ name, logo }) => (
          <Tooltip key={name} content={name}>
            <Avatar
              name={name}
              src={logo ?? ''}
              classNames={{
                base: 'h-7 w-7 text-red-500',
              }}
            />
          </Tooltip>
        ))}
      </AvatarGroup>
    </div>
  );
};

const CHAIN_COUNTS = {
  XS: 6,
  SM: 8,
  DEFAULT: 12,
} as const;

const AvatarGroupCount = ({ count }: { count: number }) => (
  <Tooltip content={`${count} other ${getPluralText('chain', count)}`}>
    <div className="z-10 ml-[-10px] flex size-[30px] items-center justify-center rounded-full bg-[#E5ECF6]">
      <Text className="font-lato text-sm text-dark-gray" text={`+${count}`} />
    </div>
  </Tooltip>
);
