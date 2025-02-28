import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  UserSignupPayload,
  userSignupPayloadSchema,
  UserSignupResponse,
  userSignupResponseSchema,
} from '@jobstash/profile/core';
import { ERR_INTERNAL, MW_URL } from '@jobstash/shared/core';
import { notifError } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { mwFetch } from '@jobstash/shared/data';

const signup = async (payload?: UserSignupPayload) => {
  const url = `${MW_URL}/users/signup`;

  const options = {
    method: 'POST' as const,
    responseSchema: userSignupResponseSchema,
    sentryLabel: 'userSignup',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: userSignupPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return mwFetch<UserSignupResponse, UserSignupPayload>(url, options);
};

export const useUserSignup = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: (payload: UserSignupPayload) => signup(payload),
    onSuccess(_data, { orgId }) {
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'profile-authorized-orgs'],
      });

      // FIX ME: payment link?
      //   - no way to check if user is owner
      // if (typeof data === 'string') {
      //   notifSuccess({
      //     title: 'User signed up',
      //     message: data,
      //   });
      // }
    },
    onError(error) {
      notifError({
        title: 'User signup failed',
        message: error.message ?? ERR_INTERNAL,
      });
    },
  });
};
