import { useRouter } from 'next/router';
import { useReducer } from 'react';

import { LoadingPage } from '@jobstash/shared/pages';
import { useAtomValue } from 'jotai';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import { MW_URL } from '@jobstash/shared/core';

import { isLoadingDevCallbackAtom, useAuthContext } from '@jobstash/auth/state';
import { useIsMounted } from '@jobstash/shared/state';

import {
  ConnectEmailSection,
  PickRoleButton,
  PickRoleEmailIcon,
  PickRoleGithubIcon,
  PickRoleSection,
} from '@jobstash/auth/ui';
import { Text } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

interface Props {
  fromSSR?: boolean;
}

export const PickRolePage = ({ fromSSR }: Props) => {
  const { push } = useRouter();

  const onClickDevGithub = () => {
    push(`${MW_URL}/github/trigger-dev-github-oauth`);
  };

  const shouldRenderPickRole = useFlowCheck();

  if (!shouldRenderPickRole) {
    return <LoadingPage />;
  }

  return (
    <div className="w-full pl-52">
      <SideBar />

      <div className="flex h-screen pl-4 [&>*]:w-full">
        <DevSection onClickDevGithub={onClickDevGithub} />
        <OrgSection />
      </div>
    </div>
  );
};

const useFlowCheck = () => {
  const isMounted = useIsMounted();
  const isLoadingDevCallback = useAtomValue(isLoadingDevCallbackAtom);
  const { flow } = useAuthContext();

  return (
    isMounted && !isLoadingDevCallback && flow === CHECK_WALLET_FLOWS.PICK_ROLE
  );
};

const DevSection = ({ onClickDevGithub }: { onClickDevGithub: () => void }) => {
  const [showConnectEmail, toggleConnectEmail] = useReducer((b) => !b, false);

  return (
    <PickRoleSection
      className={['bg-gradient-to-l from-primary to-secondary']}
      withTopHr={!showConnectEmail}
    >
      {showConnectEmail ? (
        <ConnectEmailSection toggleConnectEmail={toggleConnectEmail} />
      ) : (
        <>
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
            text="Connect with Organization Email"
            icon={<PickRoleEmailIcon />}
            onClick={toggleConnectEmail}
          />

          <hr className="border-t border-white/10" />

          <PickRoleButton
            text="Connect with Github"
            icon={<PickRoleGithubIcon />}
            onClick={onClickDevGithub}
          />
        </>
      )}
    </PickRoleSection>
  );
};

const OrgSection = () => (
  <PickRoleSection>
    <Text size="lg" fw="bold">
      Organization
    </Text>
    <div className="flex w-72">
      <Text color="dimmed" size="sm">
        We need to verify you are part of an organization to let you sign in. We
        support Github and email validation for this. Please pick one of the
        two.
      </Text>
    </div>

    <PickRoleButton
      isDisabled
      text="Connect with Organization Email"
      icon={<PickRoleEmailIcon />}
    />

    <hr className="border-t border-white/10" />

    <PickRoleButton
      isDisabled
      text="Connect with Github"
      icon={<PickRoleGithubIcon />}
    />
  </PickRoleSection>
);
