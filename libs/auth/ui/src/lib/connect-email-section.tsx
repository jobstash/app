import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';

import { TextInput, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { notifLoading, notifSuccess } from '@jobstash/shared/utils';

import {
  isMagicLinkAtom,
  useAuthContext,
  useSendMagicLink,
} from '@jobstash/auth/state';

import { Button, Text } from '@jobstash/shared/ui';

const ConnectEmailSection = () => {
  const { push } = useRouter();
  const [destination, setDestination] = useState('');

  const { isSuccess, isLoading, isError, mutate } = useSendMagicLink();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDestination(e.currentTarget.value);
  };

  const onClickSend = () => {
    mutate(destination);
  };

  const setIsMagicLink = useSetAtom(isMagicLinkAtom);
  const onClickBack = () => setIsMagicLink(false);

  const { role } = useAuthContext();

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

  // Success Toast and redirect
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (role === CHECK_WALLET_ROLES.DEV) {
      notifications.clean();

      notifSuccess({
        title: 'Email Confirmed!',
        message: 'You have successfully connected your email',
      });

      timeout = setTimeout(() => {
        setIsMagicLink(false);
        push('/profile');
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [push, role, setIsMagicLink]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white/5 pt-20 pb-10 md:pt-0">
      <div className="flex flex-col space-y-8 rounded-3xl bg-gradient-to-l from-[#141317] to-black/70 p-8 text-center">
        {isSuccess ? (
          <div className="flex w-full justify-start">
            <Tooltip
              label="Magic Link already sent to your email!"
              color="dark"
              bg="rgb(52,52,52)"
              offset={10}
              position="top-start"
            >
              <div>
                <Button
                  isDisabled
                  size="sm"
                  variant="outline"
                  left={<CaretLeft />}
                >
                  Back
                </Button>
              </div>
            </Tooltip>
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            left={<CaretLeft />}
            isDisabled={isLoading}
            onClick={onClickBack}
          >
            Back
          </Button>
        )}

        <hr className="border-t border-white/10" />

        <div className="flex items-center justify-center w-full">
          <Image src="/logo-512.svg" height={133} width={133} alt="" />
        </div>

        <Text size="xl" fw="bold">
          Connect with Organizations Email
        </Text>

        <div className="flex w-full justify-start">
          <Text color="dimmed">Organizations Email Address</Text>
        </div>

        <div className="w-full">
          <TextInput
            disabled={(isSuccess || isLoading) && !isError}
            placeholder="Enter organization email address"
            size="lg"
            value={destination}
            classNames={{
              input:
                'rounded-lg bg-dark-gray/70 text-white font-bold text-md placeholder:font-normal placeholder:text-white/40 placeholder:text-md border-none focus:border-white/40 w-full rounded-lg',
            }}
            onChange={onChange}
          />
        </div>

        <div className="w-full">
          <hr className="border-t border-white/10" />
        </div>

        <Button
          isFullWidth
          variant="primary"
          isDisabled={!destination || isSuccess || isLoading}
          onClick={onClickSend}
        >
          <div className="w-full flex justify-center py-2">
            <Text fw="bold">
              {isLoading
                ? 'Sending ...'
                : isSuccess
                ? 'Magic Link Sent!'
                : 'Send Magic Link'}
            </Text>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ConnectEmailSection;

const CaretLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);
