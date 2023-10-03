import { type ReactNode, useMemo } from 'react';

import { BlockedTermsContext } from '../contexts/blocked-terms-context';
import { useBlockedTagsQuery } from '../hooks/use-blocked-tags-query';

interface Props {
  children: ReactNode;
}

export const BlockedTermsProvider = ({ children }: Props) => {
  const { isLoading, isFetching, data } = useBlockedTagsQuery();

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
