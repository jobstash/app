import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BlockedTermsPayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postUnsetBlockedTerms } from '@jobstash/admin/data';

import { useBlockedTermsContext } from '../contexts/blocked-terms-context';

export const useUnsetBlockedTermsMutation = () => {
  const queryClient = useQueryClient();

  const { fetchedBlockedTerms } = useBlockedTermsContext();

  const {
    isLoading: isLoadingUnsetBlockedTerms,
    mutate: mutateUnsetBlockedTerms,
  } = useMutation({
    mutationFn: ({ tagNameList }: BlockedTermsPayload) =>
      postUnsetBlockedTerms({ tagNameList }),
    onSuccess(_, { tagNameList }) {
      const title = `New Unblocked Term${tagNameList.length > 1 ? 's' : ''}`;

      const message = `${tagNameList.join(', ')}`;

      notifSuccess({
        title,
        message,
        autoClose: 10_000,
      });

      // Manually cache fetched blocked-techs
      queryClient.setQueryData(
        ['godmodeBlockedTags'],
        fetchedBlockedTerms.filter((tagName) => !tagNameList.includes(tagName)),
      );
      queryClient.invalidateQueries(['godmodeBlockedTags']);
    },
    onError(data) {
      notifError({
        title: 'Unblock Term Failed',
        message: (data as Error).message,
      });
    },
  });

  return { isLoadingUnsetBlockedTerms, mutateUnsetBlockedTerms };
};
