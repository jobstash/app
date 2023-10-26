import { Chain } from '@jobstash/shared/core';
import { getPluralText } from '@jobstash/shared/utils';

import { CardSet, ChainIcon, ChainList } from '@jobstash/shared/ui';

interface Props {
  chains: Chain[];
}

const RightPanelProjectCardChains = ({ chains }: Props) => {
  if (chains.length === 0) return null;

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center gap-2">
          <CardSet icon={<ChainIcon />}>{`${getPluralText(
            'Chain',
            chains.length,
          )}:`}</CardSet>
        </div>

        <ChainList chains={chains} />
      </div>
    </>
  );
};

export default RightPanelProjectCardChains;
