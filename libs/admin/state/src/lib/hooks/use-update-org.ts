import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ManagedOrgPayload } from '@jobstash/admin/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { updateOrg } from '@jobstash/admin/data';

const TOAST_ID = 'update-managed-org-toast';

export const useUpdateOrg = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: (payload: ManagedOrgPayload) => updateOrg(payload),

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

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'get-managed-org', orgId],
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
