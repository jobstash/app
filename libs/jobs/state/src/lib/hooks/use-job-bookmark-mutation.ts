import { useMutation } from '@tanstack/react-query';

import { JobBookmarkPayload } from '@jobstash/jobs/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { addJobBookmark } from '@jobstash/jobs/data';

export const useJobBookmarkMutation = () => {
  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: JobBookmarkPayload) => addJobBookmark(payload),
    onSuccess() {
      notifSuccess({
        title: 'Bookmarked!',
        message: 'Job has been added to your list',
      });

      // TODO: invalidate GET bookmarks endpoint
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
