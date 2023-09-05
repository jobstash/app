import { type ReactNode, useMemo } from 'react';

import { BlockedTermsMutationContext } from '../contexts/blocked-terms-mutation-context';
import { useBlockedTermsMutation } from '../hooks/use-blocked-terms-mutation';
import { useUnsetBlockedTermsMutation } from '../hooks/use-unset-blocked-terms-mutation';

interface Props {
  children: ReactNode;
}

export const BlockedTermsMutationProvider = ({ children }: Props) => {
  const { isLoadingSetBlockedTerms, mutateSetBlockedTerms } =
    useBlockedTermsMutation();
  const { isLoadingUnsetBlockedTerms, mutateUnsetBlockedTerms } =
    useUnsetBlockedTermsMutation();

  const isLoading = [
    isLoadingSetBlockedTerms,
    isLoadingUnsetBlockedTerms,
  ].includes(true);

  const value = useMemo(
    () => ({
      isLoading,
      mutateSetBlockedTerms,
      mutateUnsetBlockedTerms,
    }),
    [isLoading, mutateSetBlockedTerms, mutateUnsetBlockedTerms],
  );

  return (
    <BlockedTermsMutationContext.Provider value={value}>
      {children}
    </BlockedTermsMutationContext.Provider>
  );
};
