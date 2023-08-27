import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GodmodeBlockedTermsPayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postSetBlockedTerms } from '@jobstash/admin/data';

import { useBlockedTermsStore } from '../store/blocked-terms-store';

export const useGodmodeBlockedTermsMutation = () => {
  const queryClient = useQueryClient();

  const fetchedBlockedTerms = useBlockedTermsStore(
    (state) => state.fetchedBlockedTerms,
  );
  const onSuccessBlockTerms = useBlockedTermsStore(
    (state) => state.onSuccessBlockTerms,
  );

  const { isLoading: isLoadingSetBlockedTerms, mutate: mutateSetBlockedTerms } =
    useMutation({
      mutationFn: ({
        technologyNameList,
        creatorWallet,
      }: GodmodeBlockedTermsPayload) =>
        postSetBlockedTerms({ technologyNameList, creatorWallet }),
      onSuccess(_, { technologyNameList }) {
        const title = `New Blocked Term${
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
          [...fetchedBlockedTerms, ...technologyNameList],
        );
        queryClient.invalidateQueries(['godmodeBlockedTechnologies']);

        onSuccessBlockTerms(technologyNameList);
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
