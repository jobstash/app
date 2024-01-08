import { TextInput } from '@mantine/core';

import { useProfileHeaderContext } from '@jobstash/profile/state';

import { Heading } from '@jobstash/shared/ui';

const ProfileHeaderCountryInput = () => {
  const {
    location: { country },
    onChangeCountry,
  } = useProfileHeaderContext();

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Heading size="xs" fw="bold">
          Country
        </Heading>
      </div>
      <TextInput
        placeholder="Your Country"
        size="lg"
        value={country ?? ''}
        classNames={{
          input:
            'rounded-lg bg-dark text-md placeholder:text-white/40 placeholder:text-md focus:border-white/40',
        }}
        onChange={onChangeCountry}
      />
    </div>
  );
};

export default ProfileHeaderCountryInput;
