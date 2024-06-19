import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UpdateATSPreferencePayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { updateATSPreference } from '@jobstash/profile/data';

export const useUpdateATSPreference = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: async (payload: UpdateATSPreferencePayload) =>
      updateATSPreference(payload),
    async onSuccess() {
      notifSuccess({
        title: 'Preference Changed',
        message: 'Your preferences have been updated.',
      });
      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'get-ats-client'],
      });
    },
    onError(error) {
      notifError({
        title: 'Preference Update Failed!',
        message: error.message,
      });
    },
  });
};
