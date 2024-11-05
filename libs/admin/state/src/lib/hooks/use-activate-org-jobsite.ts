import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { OrgJobsitePayload } from '@jobstash/admin/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { activateOrgJobsite } from '@jobstash/admin/data';

const TOAST_ID = 'activate-org-jobsite-toast';

export const useActivateOrgJobsite = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: (payload: OrgJobsitePayload) => activateOrgJobsite(payload),
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
