import { useState } from 'react';

import { Button, Input } from '@nextui-org/react';

import { useSendMagicLink } from '@jobstash/auth/state';
import { useProfileInfoContext } from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

const FORM_TEXT =
  'Add multiple email addresses to your account for improved communication and legitimacy.';

const DESCRIPTION_TEXT = 'A magic link will be sent to verify your email.';

export const ConnectEmailForm = () => {
  const { profileInfoData } = useProfileInfoContext();
  const { isPending, mutate, isSuccess } = useSendMagicLink('dev');
  const [email, setEmail] = useState('');

  if (!profileInfoData) return null;
  if (profileInfoData.email.length >= 3) return null;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      mutate(email);
    }
  };

  const isDisabled = isSuccess || isPending;

  return (
    <>
      <hr className="border-t border-white/10" />
      <Text color="dimmed" size="sm">
        {FORM_TEXT}
      </Text>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Input
          size="sm"
          placeholder="Enter your email here"
          description={DESCRIPTION_TEXT}
          isDisabled={isDisabled}
          value={email}
          onChange={onChange}
        />
        <Button
          radius="sm"
          isLoading={isPending}
          type="submit"
          isDisabled={isDisabled}
        >
          Send Magic Link
        </Button>
      </form>
    </>
  );
};
