import { useRouter } from 'next/router';

import { useSetAtom } from 'jotai';

import { MW_URL } from '@jobstash/shared/core';

import { pickRoleSectionAtom } from '@jobstash/auth/state';

import { Text } from '@jobstash/shared/ui';

import PickRoleButton from './pick-role-button';
import PickRoleEmailIcon from './pick-role-email-icon';
import PickRoleGithubIcon from './pick-role-github-icon';
import PickRoleSection from './pick-role-section';

const PickRoleDevSection = () => {
  const { push } = useRouter();

  const onClickDevGithub = () => {
    push(`${MW_URL}/github/trigger-dev-github-oauth`);
  };

  const setPickRoleSection = useSetAtom(pickRoleSectionAtom);

  const onClickConnect = () => setPickRoleSection('dev');

  return (
    <PickRoleSection className={['bg-gradient-to-l from-primary to-secondary']}>
      <Text size="lg" fw="bold">
        Candidate
      </Text>
      <div className="flex w-72 flex-col gap-y-6">
        <Text color="dimmed" size="sm">
          To create an account we need to validate your Github account(s).
        </Text>
        <Text color="dimmed" size="sm">
          We will then verify you own the the account, and will inspect which
          public commits you have made in the past.
        </Text>
      </div>

      <PickRoleButton
        text="Connect with Organization Email"
        icon={<PickRoleEmailIcon />}
        onClick={onClickConnect}
      />

      <hr className="border-t border-white/10" />

      <PickRoleButton
        text="Connect with Github"
        icon={<PickRoleGithubIcon />}
        onClick={onClickDevGithub}
      />
    </PickRoleSection>
  );
};

export default PickRoleDevSection;
