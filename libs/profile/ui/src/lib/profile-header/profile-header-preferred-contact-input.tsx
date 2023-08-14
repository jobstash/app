import { Select } from '@mantine/core';

import { useProfileHeaderContext } from '@jobstash/profile/state';

const INPUT_PLACEHOLDER = 'Preferred Way of Contact';

const ProfileHeaderPreferredContactInput = () => {
  const { contact, preferredContact, setPreferredContact, setSelectedContact } =
    useProfileHeaderContext();

  return (
    <Select
      placeholder={INPUT_PLACEHOLDER}
      data={contact?.options ?? []}
      value={preferredContact}
      size="lg"
      classNames={{
        input:
          'rounded-lg bg-dark text-white/60 text-lg placeholder:text-white/40 placeholder:text-lg focus:border-white/40',
        itemsWrapper: 'bg-dark',
        item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
      }}
      onChange={(v) => {
        setSelectedContact(null);
        setPreferredContact(v);
      }}
    />
  );
};

export default ProfileHeaderPreferredContactInput;
