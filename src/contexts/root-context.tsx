import { createContext, ReactNode, useMemo, useState } from 'react';

import { ActiveSectionIds } from '~/core/interfaces';

interface RootContext {
  activeIds: ActiveSectionIds;
  setActiveJobId: (id: string) => void;
}

// *** Temporary: to match with generated data from fakers
const defaultActiveIds: ActiveSectionIds = {
  jobs: 'uniswap-labs-senior-frontend-engineer-12345',
  organizations: 'todo',
  projects: 'todo',
  repositories: 'todo',
};

export const RootCtx = createContext<RootContext>({} as RootContext);

export const RootProvider = ({ children }: { children: ReactNode }) => {
  // Active ids state
  const [activeIds, setActiveIds] =
    useState<ActiveSectionIds>(defaultActiveIds);

  // Update current active job id
  const setActiveJobId = (id: string) =>
    setActiveIds((prev) => ({ ...prev, jobs: id }));

  const memoed = useMemo(
    () => ({
      activeIds,
      setActiveJobId,
    }),
    [activeIds],
  );

  return <RootCtx.Provider value={memoed}>{children}</RootCtx.Provider>;
};
