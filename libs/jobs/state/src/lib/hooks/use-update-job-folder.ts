import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UpdateJobFolderPayload } from '@jobstash/jobs/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { updateJobFolder } from '@jobstash/jobs/data';

const TOAST_ID = 'update-job-folder-toast';

interface MutationPayload {
  id: string;
  payload: UpdateJobFolderPayload;
}

export const useUpdateJobFolder = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: ({ id, payload }: MutationPayload) =>
      updateJobFolder(id, payload),
    onMutate() {
      notifications.clean();
      notifLoading({
        id: TOAST_ID,
        title: 'Updating Bookmark Folder',
        message: 'Please wait ...',
      });
    },
    async onSuccess(_data, { id }) {
      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'job-folders'],
      });
      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'job-folders', id],
      });
      notifSuccess({
        id: TOAST_ID,
        title: `Bookmark List Updated!`,
        message: `Bookmark list has been updated.`,
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
