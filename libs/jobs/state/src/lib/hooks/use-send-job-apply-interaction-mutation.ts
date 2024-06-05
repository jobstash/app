import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { JobPost } from '@jobstash/jobs/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { sendJobApplyInteraction } from '@jobstash/jobs/data';

interface Props {
  isDevOneClick: boolean;
  jobPost: JobPost | undefined;
  appliedJobs: JobPost[];
}

export const useSendJobApplyInteractionMutation = ({
  isDevOneClick,
  jobPost,
  appliedJobs,
}: Props) => {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const { mutate, isPending } = useMutation({
    mutationFn: (shortUUID: string) => sendJobApplyInteraction(shortUUID),
    onSuccess() {
      if (isDevOneClick && Boolean(jobPost)) {
        const queryKey = [mwVersion, 'jobs-applied', address];
        queryClient.setQueryData(queryKey, [...appliedJobs, jobPost]);
        queryClient.invalidateQueries({
          queryKey,
        });
      }

      if (isDevOneClick) {
        notifSuccess({
          title: 'Job Application Successful!',
          message: 'You have directly applied through jobstash!',
        });
      }
    },
    onError(error) {
      if (isDevOneClick) {
        notifError({ title: 'Job Application Failed', message: error.message });
      }
    },
  });

  return { mutate, isPendingMutation: isPending };
};
