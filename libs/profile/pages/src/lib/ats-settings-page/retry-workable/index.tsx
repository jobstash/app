import React from 'react';

import { Button, Input, Link } from '@nextui-org/react';

import { ATSPlatformName } from '@jobstash/profile/core';

import { useRetryWebhooks } from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

const BUTTON_TEXT = 'Update Token';
const WARNING_TEXT = 'There were unresolved issues preventing the integration.';
const GUIDE_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

const WarningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-5 w-5 stroke-red-500 mt-1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
    />
  </svg>
);

interface Props {
  clientId: string;
  platform: ATSPlatformName;
}

export const RetryWorkable = ({ clientId, platform }: Props) => {
  const [apiToken, setApiToken] = React.useState('');
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setApiToken(e.target.value);
  };

  const { mutate, isPending } = useRetryWebhooks(platform);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({ clientId, apiToken });
  };

  return (
    <div className="pl-4 flex flex-col gap-8">
      <div className="flex gap-3 items-center">
        <WarningIcon />
        <div className="flex flex-col">
          <Text color="dimmed">{WARNING_TEXT}</Text>
          <Text color="dimmed">
            Please read{' '}
            <Link
              href={GUIDE_URL}
              className="text-md text-white"
              underline="always"
              target="_blank"
              rel="noopener noreferrer"
            >
              this guide
            </Link>{' '}
            on how to resolve the issues.
          </Text>
        </div>
      </div>

      <form className="flex flex-col gap-4 max-w-sm" onSubmit={onSubmit}>
        <Text>Submit new token below:</Text>
        <Input
          size="sm"
          name="apiToken"
          label="API Token"
          description="API access token from workable"
          isDisabled={isPending}
          onChange={onChange}
        />
        <Button
          className="max-w-fit"
          isLoading={isPending}
          isDisabled={!apiToken || isPending}
          type="submit"
        >
          {BUTTON_TEXT}
        </Button>
      </form>
    </div>
  );
};