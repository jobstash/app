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
      <div className="flex w-80 flex-col gap-y-6">
        <Text color="dimmed" size="sm">
          We use your Github and your current or past company email to validate
          which Organization, DAO or Company you have worked with in the past or
          present.
        </Text>
        <Text color="dimmed" size="sm">
          Please use a business email account if you still have one.
        </Text>
      </div>

      <PickRoleButton
        text="Connect with Email"
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
