import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { updateSavedJobs } from '@jobstash/jobs/data';

const TOAST_ID = 'update-saved-jobs-toast';

interface MutationPayload {
  shortUUID: string;
  shouldDelete: boolean;
}

export const useUpdateSavedJobs = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: ({ shortUUID, shouldDelete }: MutationPayload) =>
      updateSavedJobs({ payload: { shortUUID }, shouldDelete }),
    onMutate() {
      notifications.clean();
      notifLoading({
        id: TOAST_ID,
        title: 'Updating Saved Jobs',
        message: 'Please wait ...',
      });
    },
    async onSuccess(_data, { shouldDelete }) {
      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'saved-jobs'],
      });

      notifSuccess({
        id: TOAST_ID,
        title: `${shouldDelete ? 'Removed from' : 'Added to'} Saved Jobs!`,
        message: `Job has been ${
          shouldDelete ? 'removed' : 'added'
        } to your list.`,
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
