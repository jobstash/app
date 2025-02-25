import React from 'react';

import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Link } from '@heroui/link';

import { ATSPlatformName } from '@jobstash/organizations/core';

import { useRetryWebhooks } from '@jobstash/organizations/state';

import { ProfileWarningIcon, Text } from '@jobstash/shared/ui';

const BUTTON_TEXT = 'Update Token';
const WARNING_TEXT = 'There were unresolved issues preventing the integration.';
const GUIDE_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

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
        <ProfileWarningIcon />
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
