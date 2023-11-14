import { useCallback, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useTagsContext } from '../contexts/tags-context';

import { useBlockedTagsQuery } from './use-blocked-tags-query';
import { useBlockedTermsMutation } from './use-blocked-terms-mutation';
import { useUnsetBlockedTermsMutation } from './use-unset-blocked-terms-mutation';

export const useBlockedTermsForm = () => {
  const { mappedTags: tags } = useTagsContext();

  const {
    isLoading: isLoadingQuery,
    isFetching: isFetchingQuery,
    data,
  } = useBlockedTagsQuery();
  const fetchedBlockedTerms = data ?? [];

  const [currentTerms, setCurrentTerms] = useState<{
    blocked: string[];
    unblocked: string[];
  }>({
    blocked: [],
    unblocked: [],
  });

  const allBlockedTerms = [
    ...new Set([...fetchedBlockedTerms, ...currentTerms.blocked]),
  ].filter((t) => !currentTerms.unblocked.includes(t));

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

  const clearBlockedTerms = () => {
    setCurrentTerms((prev) => ({
      ...prev,
      blocked: [],
    }));
  };

  const clearUnblockedTerms = () => {
    setCurrentTerms((prev) => ({
      ...prev,
      unblocked: [],
    }));
  };

  const { isLoadingSetBlockedTerms, mutateAsyncSetBlockedTerms } =
    useBlockedTermsMutation(clearBlockedTerms);
  const { isLoadingUnsetBlockedTerms, mutateAsyncUnsetBlockedTerms } =
    useUnsetBlockedTermsMutation(clearUnblockedTerms);

  const isLoadingMutation = [
    isLoadingSetBlockedTerms,
    isLoadingUnsetBlockedTerms,
  ].includes(true);

  const queryClient = useQueryClient();
  const onSubmit = async () => {
    const promises = [];
    if (currentTerms.blocked.length > 0) {
      promises.push(
        mutateAsyncSetBlockedTerms({
          tagNameList: currentTerms.blocked,
        }),
      );
    }

    if (currentTerms.unblocked.length > 0) {
      promises.push(
        mutateAsyncUnsetBlockedTerms({
          tagNameList: currentTerms.unblocked,
        }),
      );
    }

    await Promise.all(promises);

    queryClient.invalidateQueries({
      queryKey: ['godmodeBlockedTags'],
    });
  };

  return {
    isLoadingQuery,
    isFetchingQuery,
    fetchedBlockedTerms,
    options,
    currentBlockedTerms: currentTerms.blocked,
    currentUnblockedTerms: currentTerms.unblocked,
    blockTerm,
    unblockTerm,
    allBlockedTerms,
    isLoadingMutation,
    onSubmit,
  };
};
