import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AddAliasPayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { addAlias } from '@jobstash/admin/data';

export const useAddAlias = (successCb?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddAliasPayload) => addAlias(payload),
    onSuccess({ message }, { orgId }) {
      //
      // queryClient.invalidateQueries(['org-details', orgId]);
      // notifSuccess({
      //   title: `Updated alias to "${aliasName}"`,
      //   message,
      //   autoClose: 10_000,
      // });
      notifSuccess({
        title: `Alias Update Successful`,
        message,
        autoClose: 10_000,
      });

      if (successCb) {
        successCb();
      }
    },
    onError(data) {
      notifError({
        title: 'Alias Update Failed',
        message: (data as Error).message,
      });
    },
  });
};
