import { createContext, ReactNode, useMemo, useState } from 'react';

import { JobListing } from '~/core/interfaces';

/** Represents current active cards for each section */
export interface ActiveSectionCards {
  jobs: JobListing | null;
  organizations: null; // TODO
  projects: null; // TODO
  repositories: null; // TODO
}

interface RootContext {
  activeCards: ActiveSectionCards;
  setActiveJobCard: (card: JobListing) => void;
}

// *** Temporary: to match with generated data from fakers
const defaultActiveCards: ActiveSectionCards = {
  jobs: null,
  organizations: null,
  projects: null,
  repositories: null,
};

export const RootCtx = createContext<RootContext>({} as RootContext);

export const RootProvider = ({ children }: { children: ReactNode }) => {
  // Active ids state
  const [activeCards, setActiveCards] =
    useState<ActiveSectionCards>(defaultActiveCards);

  // Update current active job id
  const setActiveJobCard = (card: JobListing) =>
    setActiveCards((prev) => ({ ...prev, jobs: card }));

  const memoed = useMemo(
    () => ({
      activeCards,
      setActiveJobCard,
    }),
    [activeCards],
  );

  return <RootCtx.Provider value={memoed}>{children}</RootCtx.Provider>;
};
