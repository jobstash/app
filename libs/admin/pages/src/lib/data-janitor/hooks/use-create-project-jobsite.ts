import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Jobsite } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { createProjectJobsite } from '@jobstash/admin/data';

export const useCreateProjectJobsite = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: (payload: Jobsite) => createProjectJobsite(payload),
    onSuccess({ message }, { id }) {
      notifSuccess({
        title: 'Success!',
        message,
        autoClose: 10_000,
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'project-details', id, undefined],
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'all-projects'],
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
