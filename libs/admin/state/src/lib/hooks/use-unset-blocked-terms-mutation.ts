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
    mutationFn: ({ technologyNameList }: BlockedTermsPayload) =>
      postUnsetBlockedTerms({ technologyNameList }),
    onSuccess(_, { technologyNameList }) {
      const title = `New Unblocked Term${
        technologyNameList.length > 1 ? 's' : ''
      }`;

      const message = `${technologyNameList.join(', ')}`;

      notifSuccess({
        title,
        message,
        autoClose: 10_000,
      });

      // Manually cache fetched blocked-techs
      queryClient.setQueryData(
        ['godmodeBlockedTechnologies'],
        fetchedBlockedTerms.filter(
          (technologyName) => !technologyNameList.includes(technologyName),
        ),
      );
      queryClient.invalidateQueries(['godmodeBlockedTechnologies']);
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
