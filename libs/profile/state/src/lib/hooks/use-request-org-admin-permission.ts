import { useMutation, useQueryClient } from '@tanstack/react-query';

import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { requestOrgAdminPermission } from '@jobstash/profile/data';

export const useRequestOrgAdminPermission = (orgId: string) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: () => requestOrgAdminPermission(orgId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'get-affiliation-requests', orgId],
      });
      notifSuccess({
        title: 'Request Sent',
        message:
          'Your request has been sent to the organization admin. You will be notified once your request has been approved.',
      });
    },
    onError() {
      notifError({
        title: 'Request Failed',
        message:
          'There was an error sending your request. Please try again later.',
      });
    },
  });
};
