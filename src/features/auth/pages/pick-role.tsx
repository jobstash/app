import { useRouter } from 'next/router';

import { SideBar } from '~/features/sidebar/components';
import { Text } from '~/shared/components';
import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';
import { useIsMounted } from '~/shared/hooks';

import { PickRoleButton, PickRoleSection } from '../components';
import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROUTE } from '../core/constants';
import { useWalletAuthContext } from '../hooks';

export const PickRolePage = () => {
  const isMounted = useIsMounted();
  const { push } = useRouter();
  const { isPageEmpty, isSignedIn, checkWalletData, address, refetch } =
    useWalletAuthContext();

  if (!isMounted) return null;
  if (isPageEmpty) return null;

  if (!isSignedIn) {
    push('/login');
    return null;
  }

  if (
    isSignedIn &&
    checkWalletData &&
    checkWalletData.flow !== CHECK_WALLET_FLOWS.PICK_ROLE
  ) {
    push(CHECK_WALLET_ROUTE[checkWalletData.flow]);
    return null;
  }

  const onClickDevGithub = () => {
    push(`${NEXT_PUBLIC_MW_URL}/siwe/trigger-github-oauth`);
  };

  const githubAuth = async (code: string, address: string) => {
    const res = await fetch(`${NEXT_PUBLIC_MW_URL}/siwe/github-login`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, wallet: address }),
    });

    if (res.ok) {
      refetch();
      push('/add-github-account');
    }
  };

  const codeParam = new URLSearchParams(window.location.search).get('code');
  if (codeParam && address) {
    githubAuth(codeParam, address);
  }

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

          {codeParam ? (
            <PickRoleButton text="Loading" />
          ) : (
            <PickRoleButton
              text="Connect with Github"
              icon="github"
              onClick={onClickDevGithub}
            />
          )}

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
