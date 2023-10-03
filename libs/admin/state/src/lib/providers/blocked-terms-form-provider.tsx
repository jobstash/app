import { type ReactNode, useCallback, useMemo, useState } from 'react';

import { useBlockedTermsContext } from '../contexts/blocked-terms-context';
import { BlockedTermsFormContext } from '../contexts/blocked-terms-form-context';
import { useTagsContext } from '../contexts/tags-context';

interface Props {
  children: ReactNode;
}

export const BlockedTermsFormProvider = ({ children }: Props) => {
  const { mappedTags: tags } = useTagsContext();
  const { fetchedBlockedTerms } = useBlockedTermsContext();

  const [currentTerms, setCurrentTerms] = useState<{
    blocked: string[];
    unblocked: string[];
  }>({
    blocked: [],
    unblocked: [],
  });

  const allBlockedTerms = useMemo(
    () =>
      [...new Set([...fetchedBlockedTerms, ...currentTerms.blocked])].filter(
        (t) => !currentTerms.unblocked.includes(t),
      ),
    [currentTerms.blocked, currentTerms.unblocked, fetchedBlockedTerms],
  );

  const options = tags.filter(
    (t) => currentTerms.unblocked.includes(t) || !allBlockedTerms.includes(t),
  );

  const blockTerm = (term: string) => {
    setCurrentTerms((prev) => ({
      blocked: [...prev.blocked, term],
      unblocked: prev.unblocked.filter((t) => t !== term),
    }));
  };

  const unblockTerm = useCallback((term: string) => {
    setCurrentTerms((prev) => ({
      blocked: prev.blocked.filter((t) => t !== term),
      unblocked: [...prev.unblocked, term],
    }));
  }, []);

  const value = useMemo(
    () => ({
      options,
      currentBlockedTerms: currentTerms.blocked,
      currentUnblockedTerms: currentTerms.unblocked,
      blockTerm,
      unblockTerm,
      allBlockedTerms: [...allBlockedTerms],
    }),
    [
      allBlockedTerms,
      currentTerms.blocked,
      currentTerms.unblocked,
      options,
      unblockTerm,
    ],
  );

  return (
    <BlockedTermsFormContext.Provider value={value}>
      {children}
    </BlockedTermsFormContext.Provider>
  );
};
