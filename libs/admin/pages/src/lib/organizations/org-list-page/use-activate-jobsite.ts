import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

import {
  JobsiteActivatePayload,
  jobsiteActivatePayloadSchema,
} from '@jobstash/admin/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { mwFetch } from '@jobstash/shared/data';

const activateJobsite = async (payload: JobsiteActivatePayload) => {
  const url = `${MW_URL}/organizations/jobsites/activate`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `updateOrg`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: jobsiteActivatePayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    MessageResponse,
    JobsiteActivatePayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};

export const useActivateJobsite = () =>
  useMutation({
    mutationFn: (payload: JobsiteActivatePayload) => activateJobsite(payload),
    onMutate() {
      notifications.clean();
      notifLoading({
        id: TOAST_ID,
        title: 'Activating Jobsite',
        message: 'Please wait ...',
      });
    },
    onSuccess({ message }) {
      notifSuccess({
        id: TOAST_ID,
        title: 'Activation Successful!',
        message,
        autoClose: 10_000,
      });
    },
    onError(data) {
      notifError({
        id: TOAST_ID,
        title: 'Activation Failed!',
        message: (data as Error).message,
      });
    },
  });

const TOAST_ID = 'org-list-mutation';
