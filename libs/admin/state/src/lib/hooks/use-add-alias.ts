import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AddAliasPayload } from '@jobstash/admin/core';
import {
  getLSMwVersion,
  notifError,
  notifSuccess,
} from '@jobstash/shared/utils';

import { addAlias } from '@jobstash/admin/data';

export const useAddAlias = (successCb?: () => void) => {
  const queryClient = useQueryClient();

  const mwVersion = getLSMwVersion();

  return useMutation({
    mutationFn: (payload: AddAliasPayload) => addAlias(payload),
    onSuccess({ message }, { orgId, aliases }) {
      //
      // queryClient.setQueryData(['org-details', orgId], {
      //   ...org,
      //   aliases,
      // });

      notifSuccess({
        title: `Alias Update Successful`,
        message,
        autoClose: 10_000,
      });

      if (successCb) {
        successCb();
      }

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'org-details', orgId],
      });
    },
    onError(data) {
      notifError({
        title: 'Alias Update Failed',
        message: (data as Error).message,
      });
    },
  });
};
