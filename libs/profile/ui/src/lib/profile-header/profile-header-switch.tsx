import { type ChangeEventHandler } from 'react';

import { Switch } from '@mantine/core';
import { Tooltip } from '@nextui-org/react';

import { useProfileHeaderContext } from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

const TOOLTIP_TEXT =
  'You need atleast one preferred contact to be available for work.';

const ProfileHeaderSwitch = () => {
  const {
    isAvailableForWork,
    updateAvailability,
    preferredContact,
    contact,
    isLoading,
  } = useProfileHeaderContext();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const isChecked = e.currentTarget.checked;
    updateAvailability(isChecked);
  };

  const isDisabledSwitch =
    !preferredContact ||
    !(contact && Boolean(contact[preferredContact as keyof typeof contact]));

  return (
    <Tooltip content={TOOLTIP_TEXT} isDisabled={!isDisabledSwitch}>
      <div>
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
          disabled={isDisabledSwitch || isLoading}
          onChange={onChange}
        />
      </div>
    </Tooltip>
  );
};

export default ProfileHeaderSwitch;
