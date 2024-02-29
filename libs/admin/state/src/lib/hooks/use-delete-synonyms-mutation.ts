import { useMutation } from '@tanstack/react-query';

import { PreferredTermsPayload } from '@jobstash/admin/core';
import {
  getPluralText,
  notifError,
  notifSuccess,
} from '@jobstash/shared/utils';

import { postDeleteSynonyms } from '@jobstash/admin/data';

export const useDeleteSynonymsMutation = () => {
  const {
    isSuccess: isSuccessDeleteSynonyms,
    isPending: isLoadingDeleteSynonyms,
    mutateAsync: mutateAsyncDeleteSynonyms,
  } = useMutation({
    mutationFn: (payload: PreferredTermsPayload) => postDeleteSynonyms(payload),
    onSuccess(_, { synonyms }) {
      const title = `Deleted ${getPluralText('Synonym', synonyms.length)}`;
      const message = `${synonyms.join(', ')}`;

      notifSuccess({
        title,
        message,
        autoClose: 10_000,
      });
    },
    onError(data) {
      notifError({
        title: 'Delete Synonym Failed',
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
