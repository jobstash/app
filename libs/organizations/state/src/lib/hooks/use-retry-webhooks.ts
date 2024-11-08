import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  ATS_PROVIDERS,
  ATSPlatformName,
  RetryWebhooksPayload,
} from '@jobstash/organizations/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { retryWebhooks } from '@jobstash/organizations/data';

export const useRetryWebhooks = (platform: ATSPlatformName) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();
  return useMutation({
    mutationFn: (payload: RetryWebhooksPayload) =>
      retryWebhooks(platform, payload),
    async onSuccess(data) {
      const queryKey = [mwVersion, 'get-ats-client'];
      await queryClient.invalidateQueries({ queryKey });
      await queryClient.refetchQueries({ queryKey });

      if (platform === ATS_PROVIDERS.GREENHOUSE.platformName) {
        notifSuccess({
          title: 'Tokens Received!',
          message: `Please complete the integration by pasting the tokens in the respective fields.`,
        });
      }

      // TODO: Handle toast for other platforms - maybe reuse
      // notifSuccess({
      //   title: 'Updated ATS Client',
      //   message: `You have successfully integrated ${platform}`,
      // });
    },
    onError(error) {
      notifError({
        title: 'Update Webhook Failed!',
        message: error.message,
      });
    },
  });
};
