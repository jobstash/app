import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BlockedTermsPayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postSetBlockedTerms } from '@jobstash/admin/data';

import { useBlockedTermsContext } from '../contexts/blocked-terms-context';

export const useBlockedTermsMutation = () => {
  const queryClient = useQueryClient();

  const { fetchedBlockedTerms } = useBlockedTermsContext();

  const { isLoading: isLoadingSetBlockedTerms, mutate: mutateSetBlockedTerms } =
    useMutation({
      mutationFn: ({ tagNameList }: BlockedTermsPayload) =>
        postSetBlockedTerms({ tagNameList }),
      onSuccess(_, { tagNameList }) {
        const title = `New Blocked Term${tagNameList.length > 1 ? 's' : ''}`;

        const message = `${tagNameList.join(', ')}`;

        notifSuccess({
          title,
          message,
          autoClose: 10_000,
        });

        // Manually cache fetched blocked-techs
        queryClient.setQueryData(
          ['godmodeBlockedTags'],
          [...fetchedBlockedTerms, ...tagNameList],
        );
        queryClient.invalidateQueries(['godmodeBlockedTags']);
      },
      onError(data) {
        notifError({
          title: 'Block Term Failed',
          message: (data as Error).message,
        });
      },
    });

  return { isLoadingSetBlockedTerms, mutateSetBlockedTerms };
};
