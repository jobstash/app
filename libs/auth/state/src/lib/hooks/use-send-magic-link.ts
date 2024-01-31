import { useMutation } from '@tanstack/react-query';

import { ERR_INTERNAL } from '@jobstash/shared/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { sendMagicLink } from '@jobstash/auth/data';

export const useSendMagicLink = () =>
  useMutation({
    mutationFn: (destination: string) => sendMagicLink(destination),
    onSuccess() {
      notifSuccess({
        title: 'Magic link sent!',
        message: 'Please check your inbox for the link.',
        autoClose: 2000,
      });
    },
    onError(err) {
      const msg = (err as Error).message;
      const isEmailUsed = msg === EMAIL_USED_MSG_RESPONSE;

      const title = isEmailUsed
        ? 'Email account is already used!'
        : ERR_INTERNAL;
      const message = isEmailUsed
        ? 'Please try using a different account'
        : undefined;

      notifError({ title, message, autoClose: 15_000 });
    },
  });

const EMAIL_USED_MSG_RESPONSE = 'Email already has a user associated with it';
