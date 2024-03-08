import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SetCommunitiesPayload } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { setCommunities } from '@jobstash/admin/data';

export const useSetCommunities = (successCb?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SetCommunitiesPayload) => setCommunities(payload),

    onSuccess({ message }) {
      notifSuccess({
        title: `Successfully updated communities`,
        message,
        autoClose: 10_000,
      });

      if (successCb) {
        successCb();
      }

      queryClient.invalidateQueries({ queryKey: ['all-orgs'] });
    },
    onError(data) {
      notifError({
        title: 'Communities Update Failed',
        message: (data as Error).message,
      });
    },
  });
};
