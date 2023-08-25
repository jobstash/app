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
  const onSuccessBlockedTerms = useBlockedTermsStore(
    (state) => state.onSuccessBlockedTerms,
  );

  const { isLoading, mutate: mutateSetBlockedTerms } = useMutation({
    mutationFn: ({
      technologyNameList,
      creatorWallet,
    }: GodmodeBlockedTermsPayload) =>
      postSetBlockedTerms({ technologyNameList, creatorWallet }),
    onSuccess(_, { technologyNameList }) {
      notifSuccess({
        message: `Successfully blocked "${
          technologyNameList.length > 1
            ? `${technologyNameList.length} terms`
            : `"${technologyNameList[0]}" term`
        }"`,
      });

      // Manually cache fetched blocked-techs
      queryClient.setQueryData(
        ['godmodeBlockedTechnologies'],
        [...fetchedBlockedTerms, ...technologyNameList],
      );
      queryClient.invalidateQueries(['godmodeBlockedTechnologies']);

      onSuccessBlockedTerms(technologyNameList);
    },
    onError(data) {
      notifError({ title: 'Request Failed', message: (data as Error).message });
    },
  });

  return { isLoading, mutateSetBlockedTerms };
};
