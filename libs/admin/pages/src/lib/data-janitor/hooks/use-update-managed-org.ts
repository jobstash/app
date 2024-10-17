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

import { ManagedOrg, managedOrgSchema } from '../core/schemas';

const updateManagedOrg = async (payload: ManagedOrg) => {
  const url = `${MW_URL}/organizations/update/${payload.orgId}`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `updateOrg`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: managedOrgSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<MessageResponse, ManagedOrg>(
    url,
    options,
  );

  if (!success) throw new Error(message);

  return { success, message };
};

const TOAST_ID = 'update-managed-org-toast';

export const useUpdateManagedOrg = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: (payload: ManagedOrg) => updateManagedOrg(payload),

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
        title: 'Org Update Successful!',
        message,
        autoClose: 10_000,
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
        title: 'Org Update Failed!',
        message: (data as Error).message,
      });
    },
  });
};
