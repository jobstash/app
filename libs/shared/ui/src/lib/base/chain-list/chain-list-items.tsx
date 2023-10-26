import { type Chain } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import Avatar from '../avatar';

import ChainListCountItem from './chain-list-count-item';
import ChainListTooltip from './chain-list-tooltip';

interface Props {
  chains: Chain[];
  isShort?: boolean;
}
const DEFAULT_LOGO = 'https://chainlist.org/unknown-logo.png';

const ChainListItems = ({ chains, isShort }: Props) => {
  if (chains.length === 0) return null;

  const chainItems = isShort ? chains.slice(0, 2) : chains;
  const showCount = isShort && chains.length > 2;

  return (
    <>
      {chainItems.map(({ id, name, logo }, i) => (
        <ChainListTooltip key={id} label={name}>
          <div
            className={cn(
              { '-ml-[8px]': i !== 0 && isShort },
              { '-ml-0.5': i !== 0 && !isShort },
            )}
          >
            <Avatar key={id} size="2xs" src={logo ?? DEFAULT_LOGO} alt={name} />
          </div>
        </ChainListTooltip>
      ))}
      {showCount && <ChainListCountItem count={chains.length - 2} />}
    </>
  );
};

export default ChainListItems;
