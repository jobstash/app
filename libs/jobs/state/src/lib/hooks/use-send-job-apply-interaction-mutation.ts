import { useMutation, useQueryClient } from '@tanstack/react-query';

import { JobPost } from '@jobstash/shared/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { sendJobApplyInteraction } from '@jobstash/jobs/data';

interface Props {
  jobPost?: JobPost;
  isOneClick?: boolean;
  appliedJobs?: JobPost[];
}

export const useSendJobApplyInteractionMutation = ({
  jobPost,
  isOneClick,
  appliedJobs = [],
}: Props = {}) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();
  const queryKey = [mwVersion, 'jobs-applied'];

  const { mutate, isPending } = useMutation({
    mutationFn: (shortUUID: string) => sendJobApplyInteraction(shortUUID),
    onSuccess() {
      if (isOneClick) {
        if (jobPost) {
          queryClient.setQueryData(queryKey, [...appliedJobs, jobPost]);
        }

        notifSuccess({
          title: 'Job Application Successful!',
          message: 'You have directly applied through jobstash!',
        });
      }
    },
    onError(error) {
      notifError({ title: 'Job Application Failed', message: error.message });
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  return { mutate, isPendingMutation: isPending };
};
