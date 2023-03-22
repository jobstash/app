import Image from 'next/image';

import { Avatar, Button, Text } from '~/shared/components';

import { CenteredLayout } from '../layouts/centered-layout';

export const AddGithubAccountPage = () => (
  <CenteredLayout>
    <div className="flex flex-col space-y-6 rounded-3xl bg-gradient-to-r from-[#141317] to-black/60 p-8">
      <hr className="border-t border-white/10" />

      <Text size="lg" fw="bold">
        Add Github Account(s)
      </Text>

      <div className="w-72">
        <Text color="dimmed">
          To create a Developer account you need to connect with one or more of
          your Github account(s).
        </Text>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Avatar
            isRounded
            src={`https://avatars.dicebear.com/api/bottts/${Date.now()}.svg`}
            alt="test-user"
            size="sm"
          />
          <Text size="lg">0xDevoor</Text>
        </div>

        <div className="cursor-pointer">
          <Image
            src="/icons/thrash.svg"
            alt="Remove github account"
            width="20"
            height="20"
          />
        </div>
      </div>

      <div>
        <Button size="sm" kind="outlined">
          Add another account
        </Button>
      </div>

      <hr className="border-t border-white/10" />

      <button className="flex items-center justify-center rounded-lg bg-gradient-to-l from-primary to-secondary py-3 transition duration-150 ease-in-out hover:opacity-90">
        <Text fw="semibold" size="sm">
          Go to My Repository List
        </Text>
      </button>
    </div>
  </CenteredLayout>
);
