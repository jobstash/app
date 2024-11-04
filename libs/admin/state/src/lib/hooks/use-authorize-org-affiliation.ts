import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AuthorizeOrgAffiliationPayload } from '@jobstash/admin/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { authorizeOrgAffiliation } from '@jobstash/admin/data';

const TOAST_ID = 'authorize-toast';

export const useAuthorizeOrgAffiliation = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: (payload: AuthorizeOrgAffiliationPayload) =>
      authorizeOrgAffiliation(payload),
    onMutate() {
      notifications.clean();
      notifLoading({
        id: TOAST_ID,
        title: 'Loading',
        message: 'Please wait ...',
      });
    },
    onSuccess({ message }, { verdict }) {
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'get-admin-affiliation-requests'],
      });
      notifSuccess({
        id: TOAST_ID,
        title: verdict === 'approve' ? 'Org Approved!' : 'Org Rejected',
        message,
        autoClose: 10_000,
      });
    },
    onError({ message }) {
      notifError({
        id: TOAST_ID,
        title: 'Org Affiliation Authorization Failed',
        message,
      });
    },
  });
};
