import { useMutation, useQueryClient } from '@tanstack/react-query';

import { JobsUpdateableFields } from '@jobstash/admin/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postAllJobs } from '@jobstash/admin/data';

export const useAllJobsMutation = (initAllJobs?: JobsUpdateableFields[]) => {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: JobsUpdateableFields) => postAllJobs(payload),
    async onMutate() {
      await queryClient.cancelQueries({ queryKey: ['all-jobs'] });
    },
    onSuccess(_, vars) {
      if (initAllJobs) {
        const newData = initAllJobs.map((data) =>
          data.shortUUID === vars.shortUUID ? vars : data,
        );
        queryClient.setQueryData(['all-jobs'], newData);
      }

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
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ['all-jobs'],
      });
    },
  });

  return { isLoading, mutate };
};
