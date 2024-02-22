import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AuthorizeOrgPayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postAuthorizeOrg } from '@jobstash/admin/data';

export const useAuthorizeOrg = () => {
  const queryClient = useQueryClient();
  const { isSuccess, isLoading, mutate } = useMutation({
    mutationFn: (payload: AuthorizeOrgPayload) => postAuthorizeOrg(payload),
    onSuccess({ message }) {
      queryClient.invalidateQueries(['pending-orgs']);
      notifSuccess({
        title: 'Org Authorization Successful',
        message,
        autoClose: 10_000,
      });
    },
    onError(data) {
      notifError({
        title: 'Org Authorization Failed',
        message: (data as Error).message,
      });
    },
  });

  return { isSuccess, isLoading, mutate };
};
