import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  ATSPlatformName,
  LinkATSPlatformPayload,
} from '@jobstash/organizations/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { linkATSPlatform } from '@jobstash/organizations/data';

interface MutationParams {
  platform: ATSPlatformName;
  payload: LinkATSPlatformPayload;
  redirectPath?: string;
}

export const useLinkATSPlatform = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: ({ platform, payload }: MutationParams) =>
      linkATSPlatform(platform, payload),
    async onSuccess(_, { platform, redirectPath }) {
      notifSuccess({
        title: 'ATS Selection Successful!',
        message: `You have successfully linked your ${platform} account.`,
      });
      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'get-ats-client'],
      });
      if (redirectPath) {
        router.push(redirectPath);
      }
    },
    onError(error) {
      notifError({
        title: 'ATS Selection Failed!',
        message: error.message,
      });
    },
  });
};
