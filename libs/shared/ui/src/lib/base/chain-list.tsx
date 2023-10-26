import { Tooltip } from '@mantine/core';

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

  const withMargin = chains.length > 1;

  if (isShort && chains.length > 2) {
    return (
      <div
        className={cn('flex items-center', {
          '[&>*:not(:first-child)]:-ml-[8px]': withMargin,
        })}
      >
        {chains.slice(0, 2).map(({ id, name, logo }) => (
          <Avatar key={id} size="2xs" src={logo ?? DEFAULT_LOGO} alt={name} />
        ))}
        <div className="z-10 bg-[#E5ECF6] flex items-center justify-center w-6 h-6 min-w-[26px] min-h-[26px] rounded-3xl py-[2.5px]">
          <Text className="text-dark">{`+${chains.length - 2}`}</Text>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn('flex items-center', {
        '[&>*:not(:first-child)]:-ml-0.5]': withMargin,
      })}
    >
      {chains.map(({ id, name, logo }) => (
        <Tooltip
          key={id}
          label={name}
          color="dark"
          classNames={{ tooltip: 'bg-gray' }}
          position="top"
        >
          <Avatar size="2xs" src={logo ?? DEFAULT_LOGO} alt={name} />
        </Tooltip>
      ))}
    </div>
  );
};

export default ChainList;
