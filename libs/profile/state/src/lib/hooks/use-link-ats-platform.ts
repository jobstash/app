import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  ATSPlatformName,
  LinkATSPlatformPayload,
} from '@jobstash/profile/core';

import { useMwVersionContext } from '@jobstash/shared/state';
import { linkATSPlatform } from '@jobstash/profile/data';

const ATS_SETTINGS_PAGE = '/profile/org/ats-settings';

interface MutationParams {
  platform: ATSPlatformName;
  payload: LinkATSPlatformPayload;
}

export const useLinkATSPlatform = (redirectPath = ATS_SETTINGS_PAGE) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: ({ platform, payload }: MutationParams) =>
      linkATSPlatform(platform, payload),
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'get-ats-client'],
      });
      if (redirectPath) {
        router.push(redirectPath);
      }
    },
  });
};
