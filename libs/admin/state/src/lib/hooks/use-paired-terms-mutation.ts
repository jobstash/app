import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PairedTermsPayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postPairedTerms } from '@jobstash/admin/data';

import { usePairedTermsFormContext } from '../contexts/paired-terms-form-context';

export const usePairedTermsMutation = () => {
  const queryClient = useQueryClient();
  const { origin } = usePairedTermsFormContext();
  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: PairedTermsPayload) => postPairedTerms(payload),
    onSuccess(_, { pairedTermList }) {
      queryClient.invalidateQueries(['godmodePairedTerms']);
      // TODO: setQueryData paired terms

      const title = `New Paired Term${
        pairedTermList.length > 1 ? 's' : ''
      } for "${origin}"`;
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
