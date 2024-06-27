import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ATSPlatformName, RetryWebhooksPayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { retryWebhooks } from '@jobstash/profile/data';

export const useRetryWebhooks = (platform: ATSPlatformName) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();
  return useMutation({
    mutationFn: (payload: RetryWebhooksPayload) =>
      retryWebhooks(platform, payload),
    async onSuccess() {
      const queryKey = [mwVersion, 'get-ats-client'];
      await queryClient.invalidateQueries({ queryKey });
      await queryClient.refetchQueries({ queryKey });
      notifSuccess({
        title: 'Updated ATS Client',
        message: `You have successfully integrated ${platform}`,
      });
    },
    onError(error) {
      notifError({
        title: 'Update Webhook Failed!',
        message: error.message,
      });
    },
  });
};
