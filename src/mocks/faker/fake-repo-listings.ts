import { faker } from '@faker-js/faker';

import type { Listing, Repository } from '~/core/interfaces';

import { fakeListing } from './fake-listing';
import { fakeRepo } from './fake-repo';

export const fakeRepoListings = (): Listing[] => {
  const listings: Listing[] = [];

  for (let i = 0; i < faker.datatype.number({ min: 2, max: 6 }); i++) {
    const _listing = fakeListing();
    const listing: Listing = {
      ..._listing,
      repositories: [
        // At least one repo per listing
        fakeRepo(_listing.org, false) as Repository,
        ..._listing.repositories,
      ],
    };
    listings.push(listing);
  }

  return listings;
};
