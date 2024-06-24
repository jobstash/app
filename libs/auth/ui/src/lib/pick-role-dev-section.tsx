import { useRouter } from 'next/router';

import { useSetAtom } from 'jotai';

import { lato } from '@jobstash/shared/core';
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
    <PickRoleSection>
      <h3
        className={`${lato.className} font-semibold leading-none text-white text-[20px] lg:text-[24px] xl:text-[30px]`}
      >
        Candidate
      </h3>
      <div className="flex w-80 flex-col gap-y-4 pb-2">
        <Text color="dimmed" size="md">
          You are looking for a job.
        </Text>
        <Text color="dimmed" size="md">
          Please connect your github or your professional email, so we may
          validate your current and past contributions in crypto.
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
