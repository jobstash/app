import { Select } from '@mantine/core';

import { useProfileHeaderContext } from '@jobstash/profile/state';

const INPUT_PLACEHOLDER = 'Preferred Way of Contact';
const INPUT_DEFAULT_OPTIONS = ['Portfolio', 'Email', 'Phone'];

const ProfileHeaderPreferredContactInput = () => {
  const { isLoading, preferredContact, onChangePreferredContact } =
    useProfileHeaderContext();

  const placeholder = isLoading ? undefined : INPUT_PLACEHOLDER;

  return (
    <Select
      placeholder={placeholder}
      data={INPUT_DEFAULT_OPTIONS}
      value={preferredContact}
      size="lg"
      classNames={{
        input:
          'rounded-lg bg-dark text-white/60 text-lg placeholder:text-white/40 placeholder:text-lg focus:border-white/40',
        itemsWrapper: 'bg-dark',
        item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
      }}
      onChange={onChangePreferredContact}
    />
  );
};

export default ProfileHeaderPreferredContactInput;
