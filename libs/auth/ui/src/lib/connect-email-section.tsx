import { ChangeEventHandler, useState } from 'react';

import { TextInput } from '@mantine/core';

import { ERR_INTERNAL, MW_URL } from '@jobstash/shared/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { Button, Text } from '@jobstash/shared/ui';

import PickRoleButton from './pick-role-button';

interface Props {
  toggleConnectEmail: () => void;
}

const ConnectEmailSection = ({ toggleConnectEmail }: Props) => {
  const [orgEmail, setOrgEmail] = useState('');

  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setOrgEmail(e.currentTarget.value);
  };

  const sendMagicLink = async () => {
    setIsLoading(true);
    const { ok } = await fetch(`${MW_URL}/auth/magic/login`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destination: orgEmail }),
    });

    if (ok) {
      if (isFailed) {
        setIsFailed(false);
      }

      notifSuccess({
        title: 'Magic link sent!',
        message: 'Please check your inbox for the link.',
      });
    } else {
      if (!isFailed) {
        setIsFailed(true);
      }

      notifError({ title: ERR_INTERNAL });
    }

    setIsLoading(false);
  };

  const onClickSend = () => {
    setIsSent(true);
    sendMagicLink();
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
          disabled={(isSent || isLoading) && !isFailed}
          placeholder="Enter organization email address"
          size="lg"
          value={orgEmail}
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
            : isSent
            ? 'Magic Link Sent!'
            : 'Send Magic Link'
        }
        isDisabled={!orgEmail || isSent || isLoading}
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
