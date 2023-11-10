import { useMutation } from '@tanstack/react-query';

import { PreferredTermsPayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postDeletePreference } from '@jobstash/admin/data';

export const useDeletePreferenceMutation = () => {
  const {
    isSuccess: isSuccessDeletePreference,
    isLoading: isLoadingDeletePreference,
    mutate: mutateDeletePreference,
  } = useMutation({
    mutationFn: (payload: PreferredTermsPayload) =>
      postDeletePreference(payload),
    onSuccess(_, { synonyms }) {
      // TODO: invalidate preferred terms query

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
    isSuccessDeletePreference,
    isLoadingDeletePreference,
    mutateDeletePreference,
  };
};
