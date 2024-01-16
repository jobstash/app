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
        <Text color="dimmed" className="lg:text-lg">
          Available for work
        </Text>
      }
      classNames={{
        label: 'text-xs',
        labelWrapper: 'shrink-0 flex items-center justify-center',
      }}
      color="green"
      checked={isAvailableForWork}
      onChange={onChange}
    />
  );
};

export default ProfileHeaderSwitch;
