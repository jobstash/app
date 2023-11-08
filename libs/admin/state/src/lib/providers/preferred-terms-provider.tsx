import { type ReactNode, useMemo } from 'react';

import { PreferredTermsContext } from '../contexts/preferred-terms-context';
import { usePreferredTermsQuery } from '../hooks/use-preferred-terms-query';

interface Props {
  children: ReactNode;
}

export const PreferredTermsProvider = ({ children }: Props) => {
  const { isLoading, data } = usePreferredTermsQuery();

  const value = useMemo(
    () => ({
      isLoading,
      preferredTerms: data ?? [],
    }),
    [data, isLoading],
  );

  return (
    <PreferredTermsContext.Provider value={value}>
      {children}
    </PreferredTermsContext.Provider>
  );
};
