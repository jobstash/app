import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { OrgUpdatePayload, orgUpdatePayloadSchema } from '@jobstash/admin/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { mwFetch } from '@jobstash/shared/data';

const updateOrg = async (orgId: string, payload: OrgUpdatePayload) => {
  const url = `${MW_URL}/organizations/update/${orgId}`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `updateOrg`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: orgUpdatePayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<MessageResponse, OrgUpdatePayload>(
    url,
    options,
  );

  if (!success) throw new Error(message);

  return { success, message };
};

export const useUpdateOrg = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: ({
      orgId,
      payload,
    }: {
      orgId: string;
      payload: OrgUpdatePayload;
    }) => updateOrg(orgId, payload),

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
        queryKey: [mwVersion, 'all-orgs'],
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'org-details', orgId, undefined],
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

const TOAST_ID = 'org-list-mutation';
