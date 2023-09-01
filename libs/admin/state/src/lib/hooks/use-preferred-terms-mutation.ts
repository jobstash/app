import { useMutation } from '@tanstack/react-query';

import { PreferredTermsPayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postPreferredTerms } from '@jobstash/admin/data';

export const usePreferredTermsMutation = () => {
  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: PreferredTermsPayload) => postPreferredTerms(payload),
    onSuccess(_, { synonyms }) {
      // TODO: invalidate preferred terms query

      const title = `New Preferred Terms${synonyms.length > 1 ? 's' : ''}`;
      const message = `${synonyms.join(', ')}`;

      notifSuccess({
        title,
        message,
        autoClose: 10_000,
      });
    },
    onError(data) {
      notifError({
        title: 'Preferred Term Failed',
        message: (data as Error).message,
      });
    },
  });

  return { isLoading, mutate };
};
