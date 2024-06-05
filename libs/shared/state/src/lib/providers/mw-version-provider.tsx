import React, { useMemo } from 'react';

import { MwVersionContext } from '../contexts/mw-version-context';
import { useMwVersion } from '../hooks/use-mw-version';

interface Props {
  screenLoader: React.ReactNode;
  children: React.ReactNode;
}

export const MwVersionProvider = ({ screenLoader, children }: Props) => {
  const { mwVersion, isReady } = useMwVersion();

  const value = useMemo(
    () => ({
      mwVersion,
      isReady,
    }),
    [mwVersion, isReady],
  );

  return (
    <MwVersionContext.Provider value={value}>
      {isReady ? children : screenLoader}
    </MwVersionContext.Provider>
  );
};
