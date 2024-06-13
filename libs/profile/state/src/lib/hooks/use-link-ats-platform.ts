import { useMutation } from '@tanstack/react-query';

import {
  LinkATSPlatform,
  LinkATSPlatformPayload,
} from '@jobstash/profile/core';

import { linkATSPlatform } from '@jobstash/profile/data';

export const useLinkATSPlatform = () =>
  useMutation({
    mutationFn: ({
      platform,
      payload,
    }: {
      platform: LinkATSPlatform;
      payload: LinkATSPlatformPayload;
    }) => linkATSPlatform(platform, payload),
  });
