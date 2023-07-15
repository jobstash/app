import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { LoadingPage } from '@jobstash/shared/pages';

import { MW_URL } from '@jobstash/shared/core';

import { useIsMounted } from '@jobstash/shared/state';

import {
  PickRoleButton,
  PickRoleEmailIcon,
  PickRoleGithubIcon,
  PickRoleSection,
} from '@jobstash/auth/ui';
import { Text } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const PickRolePage = () => {
  const isMounted = useIsMounted();

  const { push } = useRouter();
  const onClickDevGithub = useCallback(() => {
    push(`${MW_URL}/github/trigger-dev-github-oauth`);
  }, [push]);

  if (!isMounted) return <LoadingPage />;

  return (
    <div className="w-full pl-52">
      <SideBar />

      <div className="flex h-screen pl-4 [&>*]:w-full">
        {/* DEV SECTION */}
        <PickRoleSection
          className={['bg-gradient-to-l from-primary to-secondary']}
        >
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
            icon={<PickRoleGithubIcon />}
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

          <PickRoleButton
            text="Connect with Organization Email"
            icon={<PickRoleEmailIcon />}
          />

          <hr className="border-t border-white/10" />

          <PickRoleButton
            text="Connect with Github"
            icon={<PickRoleGithubIcon />}
          />
        </PickRoleSection>
      </div>
    </div>
  );
};
