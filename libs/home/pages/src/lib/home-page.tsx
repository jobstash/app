import { ECOSYSTEMS } from '@jobstash/shared/core';
import { getEcosystemSubdomain } from '@jobstash/shared/utils';

import { DefaultHomePage } from './default-home-page';
import { EthdamHomePage } from './ethdam-home-page';
import { EthlondonHomePage } from './ethlondon-home-page';
import { LobsterDAOHomePage } from './lobsterdao-home-page';
import { SuperchainHomePage } from './superchain-home-page';

export const HomePage = () => {
  const { isSupported, subdomain } = getEcosystemSubdomain();

  if (isSupported) {
    return homePageMap[subdomain as keyof typeof homePageMap];
  }

  return <DefaultHomePage />;
};

const homePageMap: Record<
  typeof ECOSYSTEMS[keyof typeof ECOSYSTEMS],
  React.ReactNode
> = {
  [ECOSYSTEMS.ETHDAM]: <EthdamHomePage />,
  [ECOSYSTEMS.ETHLONDON]: <EthlondonHomePage />,
  [ECOSYSTEMS.LOBSTERDAO]: <LobsterDAOHomePage />,
  [ECOSYSTEMS.SUPERCHAIN]: <SuperchainHomePage />,
};
