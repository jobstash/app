import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { mwFetch } from '@jobstash/shared/data';

import {
  UpdateProjectPayload,
  updateProjectPayloadSchema,
} from '../core/schemas';

const updateManagedProject = async (
  projectId: string,
  payload: UpdateProjectPayload,
) => {
  const url = `${MW_URL}/projects/update/${projectId}`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `updateManagedProject`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: updateProjectPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    MessageResponse,
    UpdateProjectPayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};

const TOAST_ID = 'update-managed-project-toast';

export const useUpdateManagedProject = (projectId: string) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: (payload: UpdateProjectPayload) =>
      updateManagedProject(projectId, payload),

    onMutate() {
      notifications.clean();
      notifLoading({
        id: TOAST_ID,
        title: 'Updating Project',
        message: 'Please wait ...',
      });
    },
    onSuccess({ message }) {
      notifSuccess({
        id: TOAST_ID,
        title: 'Project Update Successful!',
        message,
        autoClose: 10_000,
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'project-details', projectId, undefined],
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'all-projects'],
      });
    },
    onError(data) {
      notifError({
        id: TOAST_ID,
        title: 'Project Update Failed!',
        message: (data as Error).message,
      });
    },
  });
};
