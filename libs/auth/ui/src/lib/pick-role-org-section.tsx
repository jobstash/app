import { useSetAtom } from 'jotai';

import { pickRoleSectionAtom } from '@jobstash/auth/state';

import { Text } from '@jobstash/shared/ui';

import PickRoleButton from './pick-role-button';
import PickRoleEmailIcon from './pick-role-email-icon';
import PickRoleGithubIcon from './pick-role-github-icon';
import PickRoleSection from './pick-role-section';

const PickRoleOrgSection = () => {
  const setPickRoleSection = useSetAtom(pickRoleSectionAtom);

  const onClickConnect = () => setPickRoleSection('org');

  return (
    <PickRoleSection>
      <Text size="lg" fw="bold">
        Organization
      </Text>
      <div className="flex w-72">
        <Text color="dimmed" size="sm">
          We need to verify you are part of an organization to let you sign in.
          We support Github and email validation for this. Please pick one of
          the two.
        </Text>
      </div>

      <PickRoleButton
        text="Connect with Organization Email"
        icon={<PickRoleEmailIcon />}
        onClick={onClickConnect}
      />

      <hr className="border-t border-white/10" />

      <PickRoleButton
        isDisabled
        text="Connect with Github"
        icon={<PickRoleGithubIcon />}
      />
    </PickRoleSection>
  );
};

export default PickRoleOrgSection;
