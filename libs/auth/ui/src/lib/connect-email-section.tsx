import Image from 'next/image';
import { FormEventHandler } from 'react';

import { TextInput } from '@mantine/core';
import { useSetAtom } from 'jotai';

import { pickRoleSectionAtom } from '@jobstash/auth/state';

import { Button, Text } from '@jobstash/shared/ui';

import SectionBackButton from './section-back-button';

interface Props {
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const ConnectEmailSection = (props: Props) => {
  const { isSuccess, isLoading, isError, onSubmit } = props;

  const setPickRoleSection = useSetAtom(pickRoleSectionAtom);
  const onClickBack = () => setPickRoleSection(null);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white/5 pt-20 pb-10 md:pt-0">
      <form
        className="flex flex-col space-y-8 rounded-3xl bg-gradient-to-l from-[#141317] to-black/70 p-8 text-center"
        onSubmit={onSubmit}
      >
        <SectionBackButton
          isSuccess={isSuccess}
          isDisabled={isLoading}
          tooltipText="Email already sent!"
          onClick={onClickBack}
        />

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
            name="destination"
            classNames={{
              input:
                'rounded-lg bg-dark-gray/70 text-white font-bold text-md placeholder:font-normal placeholder:text-white/40 placeholder:text-md border-none focus:border-white/40 w-full rounded-lg',
            }}
          />
        </div>

        <div className="w-full">
          <hr className="border-t border-white/10" />
        </div>

        <Button
          isFullWidth
          variant="primary"
          isDisabled={isSuccess || isLoading}
          type="submit"
        >
          <div className="w-full flex justify-center py-2">
            <Text fw="bold">
              {isLoading
                ? 'Sending ...'
                : isSuccess
                ? 'Email Sent!'
                : 'Send Email'}
            </Text>
          </div>
        </Button>
      </form>
    </div>
  );
};

export default ConnectEmailSection;
