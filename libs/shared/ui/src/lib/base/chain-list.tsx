import { ReactNode } from 'react';

import { Tooltip } from '@mantine/core';
import { TooltipBaseProps } from '@mantine/core/lib/Tooltip/Tooltip.types';

import { type Chain } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import Avatar from './avatar';
import Text from './text';

interface Props {
  chains: Chain[];
  isShort?: boolean;
}

const DEFAULT_LOGO = 'https://chainlist.org/unknown-logo.png';

const ChainList = ({ chains, isShort }: Props) => {
  if (chains.length === 0) return null;

  if (isShort && chains.length > 2) {
    const len = chains.length - 2;
    return (
      <div className="flex items-center">
        {chains.slice(0, 2).map(({ id, name, logo }, i) => (
          <ChainToolTip key={id} label={name}>
            <div className={cn({ '-ml-[8px]': i !== 0 })}>
              <Avatar
                key={id}
                size="2xs"
                src={logo ?? DEFAULT_LOGO}
                alt={name}
              />
            </div>
          </ChainToolTip>
        ))}
        <ChainToolTip label={`+${len} other chains`}>
          <div className="z-10 bg-[#E5ECF6] flex items-center justify-center w-6 h-6 min-w-[26px] min-h-[26px] rounded-3xl py-[2.5px] -ml-[8px]">
            <Text
              fw="medium"
              size="sm"
              className="text-dark-gray"
            >{`+${len}`}</Text>
          </div>
        </ChainToolTip>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {chains.map(({ id, name, logo }, i) => (
        <ChainToolTip key={id} label={name}>
          <div className={cn({ '-ml-0.5': i !== 0 })}>
            <Avatar size="2xs" src={logo ?? DEFAULT_LOGO} alt={name} />
          </div>
        </ChainToolTip>
      ))}
    </div>
  );
};

export default ChainList;

type ChainToolTipProps = {
  label: string;
  children: ReactNode;
} & TooltipBaseProps;

const ChainToolTip = ({ label, children, ...props }: ChainToolTipProps) => (
  <Tooltip
    label={label}
    color="dark"
    classNames={{ tooltip: 'bg-gray' }}
    position="top"
    {...props}
  >
    {children}
  </Tooltip>
);
