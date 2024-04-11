import { useMutation } from '@tanstack/react-query';

import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { sendJobApplyInteraction } from '@jobstash/jobs/data';

export const useSendJobApplyInteractionMutation = (isOneClick: boolean) => {
  const { mutate } = useMutation({
    mutationFn: (shortUUID: string) => sendJobApplyInteraction(shortUUID),
    onSuccess() {
      notifSuccess({
        title: 'Job Application Successful!',
        message: 'You have directly applied through jobstash!',
      });
    },
    onError(error) {
      notifError({ title: 'Job Application Failed', message: error.message });
    },
  });

  return { mutate };
};
