import { useMutation } from '@tanstack/react-query';

import { GodmodePairedTermsPayload } from '@jobstash/admin/core';
import { notifSuccess } from '@jobstash/shared/utils';

import { postPairedTerms } from '@jobstash/admin/data';

export const useGodmodePairedTermsMutation = () => {
  const { isLoading: isLoadingPairedTermsMutation, mutate: mutatePairedTerms } =
    useMutation({
      mutationFn: (payload: GodmodePairedTermsPayload) =>
        postPairedTerms(payload),
      onSuccess(_, { pairedTermList }) {
        const title = `New Blocked Term${pairedTermList.length > 1 ? 's' : ''}`;

        const message = `${pairedTermList.join(', ')}`;

        notifSuccess({
          title,
          message,
          autoClose: 10_000,
        });
      },
    });

  return {
    isLoadingPairedTermsMutation,
    mutatePairedTerms,
  };
};
