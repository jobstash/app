import { ReactNode, useMemo } from 'react';

import { PreferredTermsMutationContext } from '../contexts/preferred-terms-mutation-context';
import { usePreferredTermsMutation } from '../hooks/use-preferred-terms-mutation';

interface Props {
  children: ReactNode;
}

export const PreferredTermsMutationProvider = ({ children }: Props) => {
  const { isLoading, mutate } = usePreferredTermsMutation();

  const value = useMemo(() => ({ isLoading, mutate }), [isLoading, mutate]);

  return (
    <PreferredTermsMutationContext.Provider value={value}>
      {children}
    </PreferredTermsMutationContext.Provider>
  );
};
