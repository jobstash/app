import { ChangeEventHandler, useState } from 'react';

import { TextInput } from '@mantine/core';

import { useSendMagicLink } from '@jobstash/auth/state';

import { Button, Text } from '@jobstash/shared/ui';

import PickRoleButton from './pick-role-button';

interface Props {
  toggleConnectEmail: () => void;
}

const ConnectEmailSection = ({ toggleConnectEmail }: Props) => {
  const [destination, setDestination] = useState('');

  const { isSuccess, isLoading, isError, mutate } = useSendMagicLink();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDestination(e.currentTarget.value);
  };

  const onClickSend = () => {
    mutate(destination);
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        left={<CaretLeft />}
        onClick={toggleConnectEmail}
      >
        Back
      </Button>

      <hr className="border-t border-white/10" />

      <Text size="lg" fw="bold">
        Connect with Organizations Email
      </Text>

      <div className="flex w-72 flex-col gap-y-6">
        <Text color="dimmed" size="sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
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

      <PickRoleButton
        text={
          isLoading
            ? 'Sending ...'
            : isSuccess
            ? 'Magic Link Sent!'
            : 'Send Magic Link'
        }
        isDisabled={!destination || isSuccess || isLoading}
        onClick={onClickSend}
      />
    </>
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
