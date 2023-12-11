import Image from 'next/image';
import { ChangeEventHandler, forwardRef, useEffect, useState } from 'react';

import { TextInput, Tooltip } from '@mantine/core';
import { useSetAtom } from 'jotai';

import { cn } from '@jobstash/shared/utils';

import { isMagicLinkAtom, useSendMagicLink } from '@jobstash/auth/state';

import { Button, Text } from '@jobstash/shared/ui';

import PickRoleButton from './pick-role-button';
import PickRoleSection from './pick-role-section';

const ConnectEmailSection = () => {
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

  // Show loading page on success
  useEffect(() => {
    if (isSuccess) {
      setIsMagicLink(true);
    }
  }, [isSuccess, setIsMagicLink]);

  const backButton = (
    <Button
      size="sm"
      variant="outline"
      left={<CaretLeft />}
      onClick={onClickBack}
    >
      Back
    </Button>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-white/5">
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

        {/* <PickRoleButton
          text={
            isLoading
              ? 'Sending ...'
              : isSuccess
              ? 'Magic Link Sent!'
              : 'Send Magic Link'
          }
          isDisabled={!destination || isSuccess || isLoading}
          onClick={onClickSend}
        /> */}
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
