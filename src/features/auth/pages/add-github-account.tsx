import Image from 'next/image';

import { Avatar, Button, Text } from '~/shared/components';
import { useIsMounted } from '~/shared/hooks';

import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from '../core/constants';
import { CenteredLayout } from '../layouts/centered-layout';

import EmptyPage from './empty-page';

const AddGithubAccountPage = () => {
  const isMounted = useIsMounted();

  if (!isMounted) return <EmptyPage isLoading />;

  return (
    <CenteredLayout>
      <div className="flex flex-col space-y-6 rounded-3xl bg-gradient-to-r from-[#141317] to-black/60 p-8">
        <hr className="border-t border-white/10" />

        <Text size="lg" fw="bold">
          Add Github Account(s)
        </Text>

        <div className="w-72">
          <Text color="dimmed">
            To create a Developer account you need to connect with one or more
            of your Github account(s).
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
          <Button size="sm" variant="outline">
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
};

AddGithubAccountPage.requiredRole = CHECK_WALLET_ROLES.DEV;
AddGithubAccountPage.requiredFlow = CHECK_WALLET_FLOWS.ADD_GITHUB_REPO;

export default AddGithubAccountPage;
