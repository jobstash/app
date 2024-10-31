import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import myzod, { Infer } from 'myzod';

import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { mwFetch } from '@jobstash/shared/data';

const TOAST_ID = 'activate-project-jobsite-toast';

const payloadSchema = myzod.object({
  id: myzod.string(),
  jobsiteIds: myzod.array(myzod.string()),
});

type Payload = Infer<typeof payloadSchema>;

const activateProjectJobsite = async (payload: Payload) => {
  const url = `${MW_URL}/projects/jobsites/activate`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `activateProjectJobsite`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<MessageResponse, Payload>(
    url,
    options,
  );

  if (!success) throw new Error(message);

  return { success, message };
};

export const useActivateProjectJobsite = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: (payload: Payload) => activateProjectJobsite(payload),
    onMutate() {
      notifications.clean();
      notifLoading({
        id: TOAST_ID,
        title: 'Updating Project',
        message: 'Please wait ...',
      });
    },
    onSuccess({ message }, { id }) {
      notifSuccess({
        id: TOAST_ID,
        title: 'Jobsite Activation Successful!',
        message,
        autoClose: 10_000,
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'project-item', id],
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'all-projects'],
      });
    },
    onError(data) {
      notifError({
        id: TOAST_ID,
        title: 'Jobsite Activation Failed!',
        message: (data as Error).message,
      });
    },
  });
};
