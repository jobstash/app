import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UpdateProjectPayload } from '@jobstash/admin/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { updateProject } from '@jobstash/admin/data';

const TOAST_ID = 'update-project-toast';

export const useUpdateProject = (projectId: string) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: (payload: UpdateProjectPayload) =>
      updateProject(projectId, payload),

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
        queryKey: [mwVersion, 'project-details', projectId, undefined],
      });

      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'all-projects'],
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
