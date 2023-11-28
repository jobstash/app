import { useMutation } from '@tanstack/react-query';

import { JobsUpdateableFields } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postAllJobs } from '@jobstash/admin/data';

export const useAllJobsMutation = () => {
  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: JobsUpdateableFields) => postAllJobs(payload),
    onSuccess(_, vars) {
      notifSuccess({
        title: 'Job Updated',
        message: `Successfully updated job "${vars.shortUUID}"`,
        autoClose: 10_000,
      });
    },
    onError(data) {
      notifError({
        title: 'Update Job Failed',
        message: (data as Error).message,
      });
    },
  });

  return { isLoading, mutate };
};
