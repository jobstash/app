import { type Chain } from '@jobstash/shared/core';

import ChainIcon from '../../icons/chain-icon';
import CardSet from '../card-set';

import ChainListItems from './chain-list-items';

interface Props {
  chains: Chain[];
  isShort?: boolean;
}

const ChainList = ({ chains, isShort }: Props) => {
  if (chains.length === 0) return null;

  return (
    <div className="flex items-center gap-1">
      <CardSet icon={<ChainIcon />}>Chains:</CardSet>
      <div className="flex items-center">
        <ChainListItems isShort={isShort} chains={chains} />
      </div>
    </div>
  );
};

export default ChainList;
