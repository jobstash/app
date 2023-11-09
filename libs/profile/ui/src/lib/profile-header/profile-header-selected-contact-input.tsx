import { TextInput } from '@mantine/core';

import { useProfileHeaderContext } from '@jobstash/profile/state';

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
    <TextInput
      placeholder={placeholder}
      size="lg"
      disabled={!preferredContact}
      value={selectedContact ?? ''}
      classNames={{
        input:
          'rounded-lg bg-dark text-white/60 text-lg placeholder:text-white/40 placeholder:text-lg focus:border-white/40',
      }}
      onChange={onChangeSelectedContact}
    />
  );
};

export default ProfileHeaderSelectedContactInput;
