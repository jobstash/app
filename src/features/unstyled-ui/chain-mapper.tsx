import type { Chain } from '~/core/interfaces';

import { Avatar } from './base/avatar';

interface Props {
  chains: Chain[];
}

export const ChainMapper = ({ chains }: Props) => (
  <div className="flex items-center">
    {chains.map((chain) => (
      <Avatar
        key={chain.name}
        size="xs"
        src={`/chains/${chain.name}.svg`}
        alt={chain.name}
      />
    ))}
  </div>
);
