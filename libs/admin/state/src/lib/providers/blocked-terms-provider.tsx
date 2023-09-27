import { type ReactNode, useMemo } from 'react';

import { BlockedTermsContext } from '../contexts/blocked-terms-context';
import { useBlockedTechnologiesQuery } from '../hooks/use-blocked-technologies-query';

interface Props {
  children: ReactNode;
}

export const BlockedTermsProvider = ({ children }: Props) => {
  const { isLoading, isFetching, data } = useBlockedTechnologiesQuery();

  const value = useMemo(
    () => ({
      isLoading,
      isFetching,
      fetchedBlockedTerms: data ?? [],
    }),
    [data, isLoading, isFetching],
  );

  return (
    <BlockedTermsContext.Provider value={value}>
      {children}
    </BlockedTermsContext.Provider>
  );
};
