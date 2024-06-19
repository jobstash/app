import { useMutation } from '@tanstack/react-query';

import {
  ATSPlatformName,
  RegisterATSClientPayload,
} from '@jobstash/profile/core';
import { notifError } from '@jobstash/shared/utils';

import { registerATSPlatform } from '@jobstash/profile/data';

interface MutationParams {
  platform: ATSPlatformName;
  payload: RegisterATSClientPayload;
}

export const useRegisterAtsClient = () =>
  useMutation({
    mutationFn: ({ platform, payload }: MutationParams) =>
      registerATSPlatform(platform, payload),
    onError(error) {
      notifError({
        title: 'Register Failed!',
        message: error.message,
      });
    },
  });
