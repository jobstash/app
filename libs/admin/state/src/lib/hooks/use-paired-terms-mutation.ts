import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PairedTermsPayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { postPairedTerms } from '@jobstash/admin/data';

export const usePairedTermsMutation = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const { isPending, mutate } = useMutation({
    mutationFn: (payload: PairedTermsPayload) => postPairedTerms(payload),
    onSuccess(_, { pairedTagList }) {
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'godmodePairedTerms'],
      });
      // TODO: setQueryData paired terms

      const title = `New Paired Term${pairedTagList.length > 1 ? 's' : ''}`;
      const message = `${pairedTagList.join(', ')}`;

      notifSuccess({
        title,
        message,
        autoClose: 10_000,
      });
    },
    onError(data) {
      notifError({
        title: 'Paired Term Failed',
        message: (data as Error).message,
      });
    },
  });

  return {
    isLoading: isPending,
    mutate,
  };
};
