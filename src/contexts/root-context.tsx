import { createContext, ReactNode, useMemo, useState } from 'react';

import { JobListing, OrgListing } from '~/core/interfaces';

/**
 * Represents current active cards for each section
 * "jobs", "organizations", "projects", "repositories" are NOT plural forms.
 * They represent each section in routes (also mirrored in sidebar)
 * */
export interface ActiveSectionCards {
  jobs: JobListing | null;
  organizations: OrgListing | null; // TODO
  projects: null; // TODO
  repositories: null; // TODO
}

interface RootContext {
  activeCards: ActiveSectionCards;
  setActiveJobCard: (card: JobListing) => void;
  setActiveOrgCard: (card: OrgListing) => void;
}

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

  // Update current active job-card
  const setActiveJobCard = (card: JobListing) =>
    setActiveCards((prev) => ({ ...prev, jobs: card }));

  // Update current active org-card
  const setActiveOrgCard = (card: OrgListing) =>
    setActiveCards((prev) => ({ ...prev, organizations: card }));

  const memoed = useMemo(
    () => ({
      activeCards,
      setActiveJobCard,
      setActiveOrgCard,
    }),
    [activeCards],
  );

  return <RootCtx.Provider value={memoed}>{children}</RootCtx.Provider>;
};
