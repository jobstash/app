import { atom } from 'jotai';

import {
  JobListing,
  Listing,
  OrgListing,
  ProjectListing,
  RecentListings,
  RepoListing,
} from '~/core/interfaces';

export const activeListingAtom = atom<Listing | null>(null);
export const recentListingsAtom = atom<RecentListings | null>(null);
