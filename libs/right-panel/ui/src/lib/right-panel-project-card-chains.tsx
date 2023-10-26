import { Chain } from '@jobstash/shared/core';

import { ChainList } from '@jobstash/shared/ui';

interface Props {
  chains: Chain[];
}

const RightPanelProjectCardChains = ({ chains }: Props) => {
  if (chains.length === 0) return null;

  return (
    <>
      <hr className="border-t border-white/10" />
      <ChainList chains={chains} />
    </>
  );
};

export default RightPanelProjectCardChains;
