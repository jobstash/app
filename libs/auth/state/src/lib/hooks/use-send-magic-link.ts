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
    onError() {
      notifError({ title: ERR_INTERNAL });
    },
  });
