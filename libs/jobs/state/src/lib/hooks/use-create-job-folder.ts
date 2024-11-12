import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { JobFolderPayload } from '@jobstash/jobs/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { createJobFolder } from '@jobstash/jobs/data';

const TOAST_ID = 'create-job-folder-toast';

export const useCreateJobFolder = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: (payload: JobFolderPayload) => createJobFolder(payload),
    onMutate() {
      notifications.clean();
      notifLoading({
        id: TOAST_ID,
        title: 'Creating Bookmark Folder',
        message: 'Please wait ...',
      });
    },
    async onSuccess(_data, { name }) {
      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'job-folders'],
      });
      notifSuccess({
        id: TOAST_ID,
        title: `Bookmark List Created!`,
        message: `Bookmark list "${name}" has been created.`,
      });
    },
    onError(error) {
      notifError({
        id: TOAST_ID,
        title: 'Something went wrong :(',
        message: (error as Error).message,
      });
    },
  });
};
