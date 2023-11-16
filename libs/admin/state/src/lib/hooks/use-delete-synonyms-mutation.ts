import { useMutation } from '@tanstack/react-query';

import { PreferredTermsPayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postDeleteSynonyms } from '@jobstash/admin/data';

export const useDeleteSynonymsMutation = () => {
  const {
    isSuccess: isSuccessDeleteSynonyms,
    isLoading: isLoadingDeleteSynonyms,
    mutateAsync: mutateAsyncDeleteSynonyms,
  } = useMutation({
    mutationFn: (payload: PreferredTermsPayload) => postDeleteSynonyms(payload),
    onSuccess(_, { synonyms }) {
      const title = `Deleted Preferred Terms${synonyms.length > 1 ? 's' : ''}`;
      const message = `${synonyms.join(', ')}`;

      notifSuccess({
        title,
        message,
        autoClose: 10_000,
      });
    },
    onError(data) {
      notifError({
        title: 'Delete Preference Failed',
        message: (data as Error).message,
      });
    },
  });

  return {
    isSuccessDeleteSynonyms,
    isLoadingDeleteSynonyms,
    mutateAsyncDeleteSynonyms,
  };
};
