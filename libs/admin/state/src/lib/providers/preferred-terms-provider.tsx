import { type ReactNode, useMemo } from 'react';

import { PreferredTermsContext } from '../contexts/preferred-terms-context';
import { useTagsContext } from '../contexts/tags-context';
import { usePreferredTermsQuery } from '../hooks/use-preferred-terms-query';

interface Props {
  children: ReactNode;
}

export const PreferredTermsProvider = ({ children }: Props) => {
  const { mappedTags } = useTagsContext();
  const { isLoading, isFetching, data } = usePreferredTermsQuery();

  const existingPrimaryTerms = new Set(
    (data ?? []).map((preferredTerm) => preferredTerm.tag.name),
  );

  const primaryTermOptions = mappedTags.filter(
    (t) => !existingPrimaryTerms.has(t),
  );

  const value = useMemo(
    () => ({
      isLoading,
      isFetching,
      preferredTerms: data ?? [],
      primaryTermOptions,
    }),
    [data, isFetching, isLoading, primaryTermOptions],
  );

  return (
    <PreferredTermsContext.Provider value={value}>
      {children}
    </PreferredTermsContext.Provider>
  );
};
