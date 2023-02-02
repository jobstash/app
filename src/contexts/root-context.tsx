import { createContext, ReactNode, useMemo, useState } from 'react';

import type { Listing, Org } from '~/core/interfaces';

interface RootContext {
  activeListing: Listing;
  setActiveListing: (card: Listing) => void;
}

/**
 * We need to define this to handle SSR use case so that
 * the Listing interface don't have to define org as "Org | null"
 * type of org could simply be just "Org"
 * If we don't do this, NextJS will throw rendered-HTML mismatch during SSR hydration
 * */
const defaultOrg: Org = {
  name: '',
  avatar: '',
  location: '',
  teamSize: 0,
  fundingDate: '',
  summary: '',
  description: '',
  tags: [],
  techs: [],
  recent: '',
};

const defaultListing: Listing = {
  org: defaultOrg,
  jobs: [],
  projects: [],
  competitors: [],
  repositories: [],
};

export const RootCtx = createContext<RootContext>({} as RootContext);

export const RootProvider = ({ children }: { children: ReactNode }) => {
  // Active ids state
  const [activeListing, setActiveListing] = useState<Listing>(defaultListing);

  const memoed = useMemo(
    () => ({
      activeListing,
      setActiveListing,
    }),
    [activeListing],
  );

  return <RootCtx.Provider value={memoed}>{children}</RootCtx.Provider>;
};
