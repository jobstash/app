import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

import {
  UpdateNotesPayload,
  updateNotesPayloadSchema,
} from '@jobstash/profile/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { mwFetch } from '@jobstash/shared/data';

const TOAST_ID = 'update-notes-toast';

const updateNotes = async (payload: UpdateNotesPayload) => {
  const url = `${MW_URL}/xxxxxx`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `updateOrg`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: updateNotesPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    MessageResponse,
    UpdateNotesPayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};

export const useUpdateNotes = () =>
  useMutation({
    mutationFn: (payload: UpdateNotesPayload) => updateNotes(payload),
    onMutate() {
      notifications.clean();
      notifLoading({
        id: TOAST_ID,
        title: 'Updating Notes',
        message: 'Please wait ...',
      });
    },
    onSuccess({ message }) {
      notifSuccess({
        id: TOAST_ID,
        title: 'Note Update Successful!',
        message,
        autoClose: 10_000,
      });
    },
    onError(data) {
      notifError({
        id: TOAST_ID,
        title: 'Note Update Failed!',
        message: (data as Error).message,
      });
    },
  });
