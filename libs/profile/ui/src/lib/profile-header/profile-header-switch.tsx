import { type ChangeEventHandler } from 'react';

import { Switch } from '@mantine/core';

import { useProfileHeaderContext } from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

const ProfileHeaderSwitch = () => {
  const { isAvailableForWork, setIsAvailableForWork } =
    useProfileHeaderContext();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsAvailableForWork(e.currentTarget.checked);
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
