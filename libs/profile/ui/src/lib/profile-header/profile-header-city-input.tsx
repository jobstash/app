import { TextInput } from '@mantine/core';

import { useProfileHeaderContext } from '@jobstash/profile/state';

import { Heading } from '@jobstash/shared/ui';

const ProfileHeaderCityInput = () => {
  const {
    location: { city },
    onChangeCity,
  } = useProfileHeaderContext();

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Heading size="xs" fw="bold">
          City <span className="text-red-500 font-bold text-lg">*</span>
        </Heading>
      </div>
      <TextInput
        placeholder="Your City"
        size="lg"
        value={city ?? ''}
        classNames={{
          input:
            'rounded-lg bg-dark text-md placeholder:text-white/40 placeholder:text-md focus:border-white/40',
        }}
        onChange={onChangeCity}
      />
    </div>
  );
};

export default ProfileHeaderCityInput;
