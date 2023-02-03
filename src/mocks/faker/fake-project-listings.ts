import { CHAIN_UNISWAP_UNI } from '~/core/constants';
import type { Listing } from '~/core/interfaces';

import { poolChains } from './fake-chains';
import { fakeListing } from './fake-listing';
import { fakeProject } from './fake-project';

export const fakeProjectListings = (): Listing[] => {
  const listings: Listing[] = [];

  for (const name of poolChains) {
    // We skip guaranteed chain
    if (name !== CHAIN_UNISWAP_UNI) {
      const project = fakeProject(false);
      project[0].name = name;
      project[0].avatar = `/chains/${name}.svg`;

      listings.push({
        ...fakeListing(),
        projects: [...project],
      });
    }
  }

  return listings;
};
