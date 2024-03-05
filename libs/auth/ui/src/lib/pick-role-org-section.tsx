import { useRouter } from 'next/router';

import { useSetAtom } from 'jotai';

import { MW_URL } from '@jobstash/shared/core';

import { pickRoleSectionAtom } from '@jobstash/auth/state';

import { Text } from '@jobstash/shared/ui';

import PickRoleButton from './pick-role-button';
import PickRoleEmailIcon from './pick-role-email-icon';
import PickRoleSection from './pick-role-section';

const PickRoleOrgSection = () => {
  const { push } = useRouter();

  const setPickRoleSection = useSetAtom(pickRoleSectionAtom);

  const onClickConnect = () => setPickRoleSection('org');

  return (
    <PickRoleSection>
      <Text size="lg" fw="bold">
        Organization
      </Text>
      <div className="flex w-80">
        <Text color="dimmed" size="sm">
          We will manually verify your request. Please add your business email
          which the Organization will be connected to.
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
