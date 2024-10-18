import { COMMUNITIES } from '@jobstash/shared/core';
import { getCommunitySubdomain } from '@jobstash/shared/utils';

import { DefaultHomePage } from './default-home-page';
import { DevHomePage } from './dev-home-page';
import { EthdamHomePage } from './ethdam-home-page';
import { EthlondonHomePage } from './ethlondon-home-page';
import { LobsterDAOHomePage } from './lobsterdao-home-page';
import { SuperchainHomePage } from './superchain-home-page';

export const HomePage = () => {
  const { isSupported, subdomain } = getCommunitySubdomain();

  if (isSupported) {
    return homePageMap[subdomain as keyof typeof homePageMap];
  }

  return <DefaultHomePage />;
};

const homePageMap: Record<
  typeof COMMUNITIES[keyof typeof COMMUNITIES],
  React.ReactNode
> = {
  [COMMUNITIES.ETHDAM]: <EthdamHomePage />,
  [COMMUNITIES.ETHLONDON]: <EthlondonHomePage />,
  [COMMUNITIES.LOBSTERDAO]: <LobsterDAOHomePage />,
  [COMMUNITIES.SUPERCHAIN]: <SuperchainHomePage />,
  [COMMUNITIES.DEV]: <DevHomePage />,
  [COMMUNITIES.STAGING]: <DevHomePage />,
};
