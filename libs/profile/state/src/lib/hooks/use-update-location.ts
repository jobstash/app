import { useMutation, useQueryClient } from '@tanstack/react-query';
import myzod, { Infer } from 'myzod';

import { MW_URL } from '@jobstash/shared/core';
import { MessageResponse, messageResponseSchema } from '@jobstash/shared/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { mwFetch } from '@jobstash/shared/data';

const payloadSchema = myzod.object({
  city: myzod.string().nullable(),
  country: myzod.string().nullable(),
});
type Payload = Infer<typeof payloadSchema>;

const updateLocation = (payload: Payload) => {
  const url = `${MW_URL}/profile/dev/location`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: 'updateAvailability',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return mwFetch<MessageResponse, Payload>(url, options);
};

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();
  const profileInfoQueryKey = [mwVersion, 'dev-profile-info'];

  return useMutation({
    mutationFn: (payload: Payload) => updateLocation(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: profileInfoQueryKey });
      notifSuccess({
        title: 'Location updated',
        message: 'Your location has been updated successfully',
      });
    },
    onError({ message }: Error) {
      notifError({
        title: 'Error updating location',
        message,
      });
    },
  });
};
