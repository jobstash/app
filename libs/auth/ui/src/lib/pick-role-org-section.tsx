import { useSetAtom } from 'jotai';

import { lato } from '@jobstash/shared/core';

import { pickRoleSectionAtom } from '@jobstash/auth/state';

import { Text } from '@jobstash/shared/ui';

import PickRoleButton from './pick-role-button';
import PickRoleEmailIcon from './pick-role-email-icon';
import PickRoleSection from './pick-role-section';

const PickRoleOrgSection = () => {
  const setPickRoleSection = useSetAtom(pickRoleSectionAtom);

  const onClickConnect = () => setPickRoleSection('org');

  return (
    <PickRoleSection>
      <h3
        className={`${lato.className} font-semibold leading-none text-white text-[20px] lg:text-[24px] xl:text-[30px]`}
      >
        Organization
      </h3>
      <div className="flex w-80 flex-col gap-y-4 pb-2">
        <Text color="dimmed" size="md">
          You are looking to hire.
        </Text>
        <Text color="dimmed" size="md">
          Please connect your professional email, so we can validate you are an
          internal recruiter. Sorry, no external recruiters or talent agencies
          allowed.
        </Text>
      </div>

      <PickRoleButton
        text="Connect with Email"
        icon={<PickRoleEmailIcon />}
        onClick={onClickConnect}
      />
    </PickRoleSection>
  );
};

export default PickRoleOrgSection;
