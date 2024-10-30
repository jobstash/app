import { useMutation, useQueryClient } from '@tanstack/react-query';

import { JOBSITE_TYPES } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { createOrgJobsite } from '@jobstash/admin/data';

interface Payload {
  id: string;
  url: string;
  type: typeof JOBSITE_TYPES[number];
}

export const useCreateOrgJobsite = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: ({ id, url, type }: Payload) =>
      createOrgJobsite({ orgId: id, url, type }),
    onSuccess({ message }, { id }) {
      notifSuccess({
        title: 'Success!',
        message,
        autoClose: 10_000,
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'get-managed-org', id],
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
