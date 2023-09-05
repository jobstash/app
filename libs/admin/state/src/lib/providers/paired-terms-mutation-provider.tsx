import { type ReactNode, useMemo } from 'react';

import { PairedTermsMutationContext } from '../contexts/paired-terms-mutation-context';
import { usePairedTermsMutation } from '../hooks/use-paired-terms-mutation';

interface Props {
  children: ReactNode;
}

export const PairedTermsMutationProvider = ({ children }: Props) => {
  const { isLoading, mutate } = usePairedTermsMutation();

  const value = useMemo(() => ({ isLoading, mutate }), [isLoading, mutate]);

  return (
    <PairedTermsMutationContext.Provider value={value}>
      {children}
    </PairedTermsMutationContext.Provider>
  );
};
