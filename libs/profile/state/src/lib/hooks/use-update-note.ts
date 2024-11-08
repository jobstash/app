import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
  NOTE_UPDATE_UNDO_EVENT,
  UpdateApplicantNotePayload,
  updateApplicantNotePayloadSchema,
} from '@jobstash/shared/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { mwFetch } from '@jobstash/shared/data';

const TOAST_ID = 'update-notes-toast';

const updateNote = async (payload: UpdateApplicantNotePayload) => {
  const url = `${MW_URL}/users/note`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `updateNotes`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: updateApplicantNotePayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    MessageResponse,
    UpdateApplicantNotePayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};

export const useUpdateNote = () =>
  useMutation({
    mutationFn: (payload: UpdateApplicantNotePayload) => updateNote(payload),
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

      // Revert cell content
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(NOTE_UPDATE_UNDO_EVENT));
      }
    },
  });
