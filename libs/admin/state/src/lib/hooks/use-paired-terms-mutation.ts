import { useMutation } from '@tanstack/react-query';

import { PairedTermsPayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postPairedTerms } from '@jobstash/admin/data';

export const usePairedTermsMutation = () => {
  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: PairedTermsPayload) => postPairedTerms(payload),
    onSuccess(_, { pairedTermList }) {
      // TODO: invalidate paired terms query

      const title = `New Paired Term${pairedTermList.length > 1 ? 's' : ''}`;
      const message = `${pairedTermList.join(', ')}`;

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
    isLoading,
    mutate,
  };
};
