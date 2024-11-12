import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { deleteJobFolder } from '@jobstash/jobs/data';

const TOAST_ID = 'delete-job-folder-toast';

export const useDeleteJobFolder = (id: string) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: () => deleteJobFolder(id),
    onMutate() {
      notifications.clean();
      notifLoading({
        id: TOAST_ID,
        title: 'Deleting Bookmark Folder',
        message: 'Please wait ...',
      });
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'job-folders'],
      });
      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'job-folders', id],
      });
      notifSuccess({
        id: TOAST_ID,
        title: `Bookmark List Deleted!`,
        message: `Bookmark list has been deleted.`,
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
