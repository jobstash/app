import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UpdateOrgJobPayload } from '@jobstash/organizations/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { updateOrgJob } from '@jobstash/organizations/data';

const TOAST_ID = 'update-org-job-toast';

export const useUpdateOrgJob = (jobId: string) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: (payload: UpdateOrgJobPayload) => updateOrgJob(jobId, payload),

    onMutate() {
      notifications.clean();
      notifLoading({
        id: TOAST_ID,
        title: 'Updating Project',
        message: 'Please wait ...',
      });
    },
    onSuccess({ message }) {
      notifSuccess({
        id: TOAST_ID,
        title: 'Project Update Successful!',
        message,
        autoClose: 10_000,
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'org-job-list'],
      });
    },
    onError(data) {
      notifError({
        id: TOAST_ID,
        title: 'Project Update Failed!',
        message: (data as Error).message,
      });
    },
  });
};
