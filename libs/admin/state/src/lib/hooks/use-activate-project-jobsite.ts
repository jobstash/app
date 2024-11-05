import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProjectJobsitePayload } from '@jobstash/admin/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { activateProjectJobsite } from '@jobstash/admin/data';

const TOAST_ID = 'activate-project-jobsite-toast';

export const useActivateProjectJobsite = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: (payload: ProjectJobsitePayload) =>
      activateProjectJobsite(payload),
    onMutate() {
      notifications.clean();
      notifLoading({
        id: TOAST_ID,
        title: 'Updating Project',
        message: 'Please wait ...',
      });
    },
    onSuccess({ message }, { id }) {
      notifSuccess({
        id: TOAST_ID,
        title: 'Jobsite Activation Successful!',
        message,
        autoClose: 10_000,
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'project-item', id],
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'all-projects'],
      });
    },
    onError(data) {
      notifError({
        id: TOAST_ID,
        title: 'Jobsite Activation Failed!',
        message: (data as Error).message,
      });
    },
  });
};
