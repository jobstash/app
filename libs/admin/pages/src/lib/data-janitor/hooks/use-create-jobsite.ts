import { useMutation, useQueryClient } from '@tanstack/react-query';

import { JOBSITE_TYPES } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { createJobsite } from '@jobstash/admin/data';

interface Payload {
  orgId: string;
  url: string;
  type: typeof JOBSITE_TYPES[number];
}

export const useCreateJobsite = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: (payload: Payload) => createJobsite(payload),
    onSuccess({ message }, { orgId }) {
      notifSuccess({
        title: 'Success!',
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
    onError({ message }) {
      notifError({
        title: 'Import Failed!',
        message,
        autoClose: 10_000,
      });
    },
  });
};
