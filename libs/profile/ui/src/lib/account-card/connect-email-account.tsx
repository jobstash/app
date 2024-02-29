import { ChangeEventHandler, useState } from 'react';

import { TextInput } from '@mantine/core';

import { useSendMagicLink } from '@jobstash/auth/state';

import { Button, Text } from '@jobstash/shared/ui';

const ConnectEmailAccount = () => {
  const [destination, setDestination] = useState('');

  const {
    isError,
    isSuccess,
    isPending: isLoading,
    mutate,
  } = useSendMagicLink('dev');

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDestination(e.currentTarget.value);
  };

  const onClick = () => {
    mutate(destination);
  };

  return (
    <>
      <hr className="border-t border-white/10" />
      <div className="flex flex-col gap-4 py-4">
        <div className="text-center text-sm">
          <Text size="sm" color="dimmed">
            Connect Organization Email:
          </Text>
        </div>

        <div className="w-full">
          <TextInput
            disabled={(isSuccess || isLoading) && !isError}
            placeholder="name@org.email"
            size="lg"
            classNames={{
              input:
                'rounded-lg bg-dark-gray/70 text-center text-white font-bold text-md placeholder:text-center placeholder:font-normal placeholder:text-white/40 placeholder:text-md border-none focus:border-white/40 w-full rounded-lg',
            }}
            value={destination}
            onChange={onChange}
          />
        </div>

        <Button
          isFullWidth
          isDisabled={!destination || isSuccess || isLoading}
          variant="outline"
          className="justify-center py-3"
          onClick={onClick}
        >
          {isLoading
            ? 'Sending ...'
            : isSuccess
            ? 'Magic Link Sent!'
            : 'Send Magic Link'}
        </Button>
      </div>
    </>
  );
};

export default ConnectEmailAccount;
