import { TextInput } from '@mantine/core';

import { useProfileHeaderContext } from '@jobstash/profile/state';

import { Heading } from '@jobstash/shared/ui';

const ProfileHeaderSelectedContactInput = () => {
  const {
    isLoading,
    preferredContact,
    selectedContact,
    onChangeSelectedContact,
  } = useProfileHeaderContext();

  const placeholder =
    isLoading || !preferredContact ? undefined : `Your ${preferredContact}`;

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Heading size="sm" fw="bold">
          Address or Username
        </Heading>
      </div>
      <TextInput
        placeholder={placeholder}
        size="lg"
        value={selectedContact ?? ''}
        classNames={{
          input:
            'rounded-lg bg-dark text-md placeholder:text-white/40 placeholder:text-md focus:border-white/40',
        }}
        onChange={onChangeSelectedContact}
      />
    </div>
  );
};

export default ProfileHeaderSelectedContactInput;
