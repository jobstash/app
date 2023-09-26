import { type ReactNode, useMemo } from 'react';

import { PairedTermsContext } from '../contexts/paired-terms-context';
import { usePairedTermsQuery } from '../hooks/use-paired-terms-query';

interface Props {
  children: ReactNode;
}

export const PairedTermsProvider = ({ children }: Props) => {
  const { isLoading, data } = usePairedTermsQuery();

  const value = useMemo(
    () => ({
      isLoading,
      pairedTerms: data ?? [],
      existingPairedTerms: data?.map((t) => t.technology.name) ?? [],
    }),
    [data, isLoading],
  );

  return (
    <PairedTermsContext.Provider value={value}>
      {children}
    </PairedTermsContext.Provider>
  );
};
