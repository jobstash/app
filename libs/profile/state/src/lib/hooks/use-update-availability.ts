import { useMutation, useQueryClient } from '@tanstack/react-query';
import myzod, { Infer } from 'myzod';

import {
  ERR_INTERNAL,
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { mwFetch } from '@jobstash/shared/data';

const payloadSchema = myzod.object({
  availability: myzod.boolean(),
});
type Payload = Infer<typeof payloadSchema>;

const updateAvailability = async (availability: boolean) => {
  const url = `${MW_URL}/profile/availability`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: 'updateAvailability',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload: {
      availability,
    },
    payloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return mwFetch<MessageResponse, Payload>(url, options);
};

export const useUpdateAvailability = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const profileInfoQueryKey = [mwVersion, 'profile-info'];

  return useMutation({
    mutationFn: ({ availability }: Payload) => updateAvailability(availability),
    onSuccess(_, { availability }) {
      const title = availability
        ? 'You are now available for work!'
        : 'You turned off work availability.';

      const message = availability
        ? "Your profile has been updated to show that you're open to new opportunities. Employers can now view your profile and reach out to you."
        : "Your profile is now hidden from employer searches. You won't receive new job offers until you change your availability status";

      notifSuccess({
        title,
        message,
        autoClose: 6000,
      });
    },
    onError(data) {
      notifError({
        title: 'Status update failed!',
        message: data.message ?? ERR_INTERNAL,
      });
    },
    async onSettled() {
      // Always refetch after
      await queryClient.invalidateQueries({
        queryKey: profileInfoQueryKey,
      });
    },
  });
};
