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

const TOAST_ID = 'activate-jobsite-toast';

const payloadSchema = myzod.object({
  orgId: myzod.string(),
  jobsiteIds: myzod.array(myzod.string()),
});

type Payload = Infer<typeof payloadSchema>;

const activateJobsite = async (payload: Payload) => {
  const url = `${MW_URL}/organizations/jobsites/activate`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `updateOrg`,
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

export const useActivateJobsite = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: (payload: Payload) => activateJobsite(payload),
    onMutate() {
      notifications.clean();
      notifLoading({
        id: TOAST_ID,
        title: 'Updating Organization',
        message: 'Please wait ...',
      });
    },
    onSuccess({ message }, { orgId }) {
      notifSuccess({
        id: TOAST_ID,
        title: 'Jobsite Activation Successful!',
        message,
        autoClose: 10_000,
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'org-details', orgId, undefined],
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'get-managed-org', orgId],
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'all-orgs'],
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
