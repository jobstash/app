import { TextInput } from '@mantine/core';

import { useProfileHeaderContext } from '@jobstash/profile/state';

const ProfileHeaderSelectedContactInput = () => {
  const { preferredContact, selectedContact, setSelectedContact } =
    useProfileHeaderContext();

  return (
    <TextInput
      placeholder="Type here ..."
      size="lg"
      disabled={!preferredContact}
      value={selectedContact ?? ''}
      classNames={{
        input:
          'rounded-lg bg-dark text-white/60 text-lg placeholder:text-white/40 placeholder:text-lg focus:border-white/40',
      }}
      onChange={(e) => setSelectedContact(e.currentTarget.value)}
    />
  );
};

export default ProfileHeaderSelectedContactInput;
