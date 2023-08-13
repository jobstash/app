import { TextInput } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { useYourReviewContext } from '@jobstash/profile/state';

import { Heading } from '@jobstash/shared/ui';

const YourReviewHeadline = () => {
  const {
    currentReview: { headline },
    setHeadline,
    username,
  } = useYourReviewContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Heading size="md" fw="semibold">
          Review Headline
        </Heading>
        <Heading size="md" fw="semibold">
          {username}
        </Heading>
      </div>
      <div className="w-full">
        <TextInput
          placeholder="Best place I worked"
          size="lg"
          classNames={{
            input: cn(
              'rounded-lg bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-md focus:border-white/40',
              // { 'border border-white': Boolean(selectedWOC) },
            ),
          }}
          value={headline ?? ''}
          onChange={(e) => {
            setHeadline(e.currentTarget.value);
          }}
        />
      </div>
    </div>
  );
};

export default YourReviewHeadline;
