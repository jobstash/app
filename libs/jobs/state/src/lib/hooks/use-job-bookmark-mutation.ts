import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  getLSMwVersion,
  notifError,
  notifSuccess,
} from '@jobstash/shared/utils';

import { setJobBookmark } from '@jobstash/jobs/data';

export const useJobBookmarkMutation = (shouldDelete = false) => {
  const queryClient = useQueryClient();

  const mwVersion = getLSMwVersion();

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: (shortUUID: string) =>
      setJobBookmark({ payload: { shortUUID }, shouldDelete }),
    onSuccess() {
      notifSuccess({
        title: `Bookmark ${shouldDelete ? 'Removed' : 'Added'}!`,
        message: `Job has been ${
          shouldDelete ? 'removed' : 'added'
        } to your list.`,
      });

      queryClient.invalidateQueries({ queryKey: [mwVersion, 'job-bookmarks'] });
    },
    onError(error) {
      notifError({
        title: 'Something went wrong :(',
        message: (error as Error).message,
      });
    },
  });

  return { isLoading, mutate };
};
