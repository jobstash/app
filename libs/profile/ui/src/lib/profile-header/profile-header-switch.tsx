import { type ChangeEventHandler } from 'react';

import { Switch } from '@mantine/core';

import { useProfileHeaderContext } from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

const ProfileHeaderSwitch = () => {
  const { isAvailableForWork, updateAvailability } = useProfileHeaderContext();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const isChecked = e.currentTarget.checked;
    updateAvailability(isChecked);
  };

  return (
    <Switch
      size="md"
      label={
        <Text size="lg" color="dimmed">
          Available for work
        </Text>
      }
      color="green"
      checked={isAvailableForWork}
      onChange={onChange}
    />
  );
};

export default ProfileHeaderSwitch;
