import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UpdateATSPreferencePayload } from '@jobstash/profile/core';

import { useMwVersionContext } from '@jobstash/shared/state';
import { updateATSPreference } from '@jobstash/profile/data';

export const useUpdateATSPreference = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: async (payload: UpdateATSPreferencePayload) =>
      updateATSPreference(payload),
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'get-ats-client'],
      });
    },
  });
};
