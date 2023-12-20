import { Select } from '@mantine/core';

import { CONTACT_DEFAULT_OPTIONS } from '@jobstash/profile/core';

import { useProfileHeaderContext } from '@jobstash/profile/state';

import { Heading } from '@jobstash/shared/ui';

const INPUT_PLACEHOLDER = 'Preferred Way of Contact';

const ProfileHeaderPreferredContactInput = () => {
  const { isLoading, preferredContact, onChangePreferredContact } =
    useProfileHeaderContext();

  const placeholder = isLoading ? undefined : INPUT_PLACEHOLDER;

  return (
    <div className="flex flex-col gap-2">
      <Heading size="sm" fw="bold">
        Contact Me By
      </Heading>
      <Select
        allowDeselect
        placeholder={placeholder}
        data={CONTACT_DEFAULT_OPTIONS}
        value={preferredContact}
        size="lg"
        classNames={{
          input:
            'rounded-lg bg-dark text-white/60 text-lg placeholder:text-white/40 placeholder:text-lg focus:border-white/40 pr-0',
          itemsWrapper: 'bg-dark',
          item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
        }}
        onChange={onChangePreferredContact}
      />
    </div>
  );
};

export default ProfileHeaderPreferredContactInput;
