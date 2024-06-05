import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AuthorizeOrgPayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { postAuthorizeOrg } from '@jobstash/admin/data';

export const useAuthorizeOrg = (successCb?: () => void) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const { isSuccess, isPending, mutate } = useMutation({
    mutationFn: (payload: AuthorizeOrgPayload) => postAuthorizeOrg(payload),
    onSuccess({ message }, { verdict }) {
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'approval-org-list'],
      });
      notifSuccess({
        title: verdict === 'approve' ? 'Org Approved!' : 'Org Rejected',
        message,
        autoClose: 10_000,
      });

      if (successCb) {
        successCb();
      }
    },
    onError(data) {
      notifError({
        title: 'Org Authorization Failed',
        message: (data as Error).message,
      });
    },
  });

  return { isSuccess, isPending, mutate };
};
