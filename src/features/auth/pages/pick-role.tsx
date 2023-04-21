import { useRouter } from 'next/router';

import { SideBar } from '~/features/sidebar/components';
import { Text } from '~/shared/components';
import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';
import { useIsMounted } from '~/shared/hooks';

import { PickRoleButton, PickRoleSection } from '../components';
import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from '../core/constants';

import EmptyPage from './empty-page';

const PickRolePage = () => {
  const { push } = useRouter();
  const isMounted = useIsMounted();

  if (!isMounted) return <EmptyPage isLoading />;

  const onClickDevGithub = () => {
    push(`${NEXT_PUBLIC_MW_URL}/github/trigger-dev-github-oauth`);
  };

  return (
    <div className="w-full pl-52">
      <SideBar />

      <div className="flex h-screen pl-4 [&>*]:w-full">
        {/* DEV SECTION */}
        <PickRoleSection className="bg-gradient-to-l from-primary to-secondary">
          <Text size="lg" fw="bold">
            Developer
          </Text>
          <div className="flex w-72 flex-col gap-y-6">
            <Text color="dimmed" size="sm">
              To create an account we need to validate your Github account(s).
            </Text>
            <Text color="dimmed" size="sm">
              We will then verify you own the the account, and will inspect
              which public commits you have made in the past.
            </Text>
          </div>

          <PickRoleButton
            text="Connect with Github"
            icon="github"
            onClick={onClickDevGithub}
          />
          <hr className="border-t border-white/10" />
        </PickRoleSection>

        {/* ORG SECTION */}
        <PickRoleSection>
          <Text size="lg" fw="bold">
            Organization
          </Text>
          <div className="flex w-72">
            <Text color="dimmed" size="sm">
              We need to verify you are part of an organisation to let you sign
              in. We support Github and email validation for this. Please pick
              one of the two.
            </Text>
          </div>

          <PickRoleButton text="Connect with Organization Email" icon="email" />

          <hr className="border-t border-white/10" />

          <PickRoleButton text="Connect with Github" icon="github" />
        </PickRoleSection>
      </div>
    </div>
  );
};

PickRolePage.requiredRole = CHECK_WALLET_ROLES.ANON;
PickRolePage.requiredFlow = CHECK_WALLET_FLOWS.PICK_ROLE;

export default PickRolePage;
