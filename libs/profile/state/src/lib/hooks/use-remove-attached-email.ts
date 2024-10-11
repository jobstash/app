import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  MW_URL,
  MwMessageResponse,
  mwMessageResponseSchema,
} from '@jobstash/shared/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { mwFetch } from '@jobstash/shared/data';

const removeAttachedEmail = async (email: string) => {
  const url = `${MW_URL}/auth/remove-email?email=${email}`;
  const options = {
    method: 'DELETE' as const,
    responseSchema: mwMessageResponseSchema,
    sentryLabel: 'removeAttachedEmail',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<MwMessageResponse>(url, options);
};

export const useRemoveAttachedEmail = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: (email: string) => removeAttachedEmail(email),
    async onSuccess(_data, email) {
      notifSuccess({
        title: 'Email Removed!',
        message: `${email} has been removed from your account.`,
      });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [mwVersion, 'profile-info'],
        }),
        queryClient.invalidateQueries({
          queryKey: [mwVersion, 'check-wallet'],
        }),
      ]);
    },
    onError(error) {
      notifError({
        title: 'Something went wrong :(',
        message: (error as Error).message,
      });
    },
  });
};
