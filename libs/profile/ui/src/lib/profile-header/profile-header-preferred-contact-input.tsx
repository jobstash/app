import { Select } from '@mantine/core';

import { CONTACT_DEFAULT_OPTIONS } from '@jobstash/profile/core';

import { useProfileHeaderContext } from '@jobstash/profile/state';

import { Heading } from '@jobstash/shared/ui';

const ProfileHeaderPreferredContactInput = () => {
  const { preferredContact, onChangePreferredContact } =
    useProfileHeaderContext();

  return (
    <div className="flex flex-col gap-2">
      <Heading size="xs" fw="bold">
        Contact Me By
      </Heading>
      <Select
        allowDeselect
        data={CONTACT_DEFAULT_OPTIONS}
        value={preferredContact}
        size="lg"
        classNames={{
          input:
            'rounded-lg bg-dark text-md placeholder:text-white/40 placeholder:text-md focus:border-white/40 pr-0',
          itemsWrapper: 'bg-dark',
          item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
        }}
        onChange={onChangePreferredContact}
      />
    </div>
  );
};

export default ProfileHeaderPreferredContactInput;
