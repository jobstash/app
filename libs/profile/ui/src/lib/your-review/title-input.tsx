import { TextInput } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { useProfileOrgReviewFormContext } from '@jobstash/profile/state';

import { Heading, Text } from '@jobstash/shared/ui';

const TitleInput = () => {
  const {
    review: { title },
    setTitle,
  } = useProfileOrgReviewFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Heading size="md" fw="semibold">
          Title
        </Heading>

        <Text color="dimmed">Give this review a compelling title</Text>
      </div>
      <div className="w-full">
        <TextInput
          placeholder="Best place I worked"
          size="lg"
          classNames={{
            input: cn(
              'rounded-lg bg-dark-gray text-md placeholder:text-white/50 placeholder:text-md focus:border-white/40',
              // { 'border border-white': Boolean(selectedWOC) },
            ),
          }}
          value={title ?? ''}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
      </div>
    </div>
  );
};

export default TitleInput;
