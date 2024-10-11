import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  MW_URL,
  MwMessageResponse,
  mwMessageResponseSchema,
} from '@jobstash/shared/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { mwFetch } from '@jobstash/shared/data';

const updateMainEmail = async (email: string) => {
  const url = `${MW_URL}/auth/update-main-email?email=${email}`;
  const options = {
    method: 'POST' as const,
    responseSchema: mwMessageResponseSchema,
    sentryLabel: 'updateMainEmail',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<MwMessageResponse>(url, options);
};

export const useUpdateMainEmail = (email: string) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();
  return useMutation({
    mutationFn: () => updateMainEmail(email),
    async onSuccess(_data) {
      notifSuccess({
        title: 'Main Email Updated!',
        message: `${email} has been updated as your main email.`,
      });

      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'profile-info'],
      });
    },
    onError(error) {
      notifError({
        title: 'Something went wrong :(',
        message: (error as Error).message,
      });
    },
  });
};
