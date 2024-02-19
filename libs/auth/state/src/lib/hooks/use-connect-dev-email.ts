import { useRouter } from 'next/router';
import { FormEventHandler, useEffect, useRef } from 'react';

import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { pickRoleSectionAtom } from '../atoms/pick-role-section-atom';

import { useAuthContext } from './use-auth-context';
import { useSendMagicLink } from './use-send-magic-link';

export const useConnectDevEmail = () => {
  const { isSuccess, isLoading, isError, mutate } = useSendMagicLink();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const destination = formData.get('destination');

    if (destination && typeof destination === 'string') {
      mutate(destination);
    }
  };

  // Show Pending notif
  const pendingToastRef = useRef(false);
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isSuccess && !pendingToastRef.current) {
      pendingToastRef.current = true;

      timeout = setTimeout(() => {
        notifLoading({
          title: 'Waiting for confirmation',
          message: 'Please check your inbox for the link.',
        });
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  // Poll data every 2s
  const { role } = useAuthContext();
  const queryClient = useQueryClient();
  useEffect(() => {
    const interval = setInterval(() => {
      if (role !== CHECK_WALLET_ROLES.DEV) {
        queryClient.invalidateQueries(['check-wallet']);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [queryClient, role]);

  const setPickRoleSection = useSetAtom(pickRoleSectionAtom);

  // Success Toast and redirect
  const { push } = useRouter();
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (role === CHECK_WALLET_ROLES.DEV) {
      notifications.clean();

      notifSuccess({
        title: 'Email Confirmed!',
        message: 'You have successfully connected your email',
      });

      timeout = setTimeout(() => {
        setPickRoleSection(null);
        push('/profile');
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [push, role, setPickRoleSection]);

  return {
    isSuccess,
    isLoading,
    isError,
    onSubmit,
  };
};
