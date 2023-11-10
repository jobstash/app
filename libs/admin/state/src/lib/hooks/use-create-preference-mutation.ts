import { useMutation } from '@tanstack/react-query';

import { PreferredTermsPayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postCreatePreference } from '@jobstash/admin/data';

export const useCreatePreferenceMutation = () => {
  const {
    isSuccess: isSuccessCreatePreference,
    isLoading: isLoadingCreatePreference,
    mutate: mutateCreatePreference,
  } = useMutation({
    mutationFn: (payload: PreferredTermsPayload) =>
      postCreatePreference(payload),
    onSuccess(_, { synonyms }) {
      // TODO: invalidate preferred terms query

      const title = `Created Preferred Terms${synonyms.length > 1 ? 's' : ''}`;
      const message = `${synonyms.join(', ')}`;

      notifSuccess({
        title,
        message,
        autoClose: 10_000,
      });
    },
    onError(data) {
      notifError({
        title: 'Create Preference Failed',
        message: (data as Error).message,
      });
    },
  });

  return {
    isSuccessCreatePreference,
    isLoadingCreatePreference,
    mutateCreatePreference,
  };
};
