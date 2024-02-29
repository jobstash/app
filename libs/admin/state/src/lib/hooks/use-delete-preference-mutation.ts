import { useMutation } from '@tanstack/react-query';

import { type DeletePreferencePayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postDeletePreference } from '@jobstash/admin/data';

export const useDeletePreferenceMutation = () => {
  const {
    isSuccess: isSuccessDeletePreference,
    isPending: isLoadingDeletePreference,
    mutateAsync: mutateAsyncDeletePreference,
  } = useMutation({
    mutationFn: (payload: DeletePreferencePayload) =>
      postDeletePreference(payload),
    onSuccess(_, { preferredName }) {
      const title = `Deleted Preference`;
      const message = `Removed preference for "${preferredName}"`;

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
    mutateAsyncDeletePreference,
  };
};
