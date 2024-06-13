import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  LinkATSPlatform,
  LinkATSPlatformPayload,
} from '@jobstash/profile/core';

import { useMwVersionContext } from '@jobstash/shared/state';
import { linkATSPlatform } from '@jobstash/profile/data';

export const useLinkATSPlatform = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: ({
      platform,
      payload,
    }: {
      platform: LinkATSPlatform;
      payload: LinkATSPlatformPayload;
    }) => linkATSPlatform(platform, payload),
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'get-ats-client'],
      });
      router.push('/profile/org/ats-settings');
    },
  });
};
