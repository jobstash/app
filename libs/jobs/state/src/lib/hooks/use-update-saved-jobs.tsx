import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { sonnerToast } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { updateSavedJobs } from '@jobstash/jobs/data';

const LOADING_TOAST_ID = 'update-saved-jobs-toast-loading';
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
      toast.dismiss(TOAST_ID);
      sonnerToast({
        id: LOADING_TOAST_ID,
        isPending: true,
        title: 'Updating Saved Jobs',
        message: 'Please wait ...',
      });
    },
    async onSuccess(_data, { shouldDelete }) {
      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'saved-jobs'],
      });

      toast.dismiss(LOADING_TOAST_ID);
      sonnerToast({
        id: TOAST_ID,
        title: `${shouldDelete ? 'Removed from' : 'Added to'} Saved Jobs!`,
        message: `Job has been ${
          shouldDelete ? 'removed' : 'added'
        } to your list.`,
      });
    },
    onError(error) {
      sonnerToast({
        id: TOAST_ID,
        title: 'Something went wrong :(',
        message: (error as Error).message,
      });
    },
  });
};
