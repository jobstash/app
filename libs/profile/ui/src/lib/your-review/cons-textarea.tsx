import { Textarea } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { useProfileOrgReviewFormContext } from '@jobstash/profile/state';

import { Heading, Text } from '@jobstash/shared/ui';

const ConsTextarea = () => {
  const {
    review: { cons },
    setCons,
  } = useProfileOrgReviewFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Heading size="md" fw="semibold">
          Cons
        </Heading>

        <Text color="dimmed">
          Tell others about things the recurring painpoints or things you
          didn&#39;t like about this organization
        </Text>
      </div>
      <div className="w-full">
        <Textarea
          autosize
          inputWrapperOrder={['input', 'description']}
          descriptionProps={{
            className: 'text-right pt-2 pr-2',
          }}
          minRows={3}
          classNames={{
            input: cn(
              'rounded-lg bg-dark-gray text-white/60 focus:border-white p-4',
            ),
          }}
          description={`${500 - (cons?.length ?? 0)} characters left`}
          value={cons ?? ''}
          onChange={(e) => {
            setCons(e.currentTarget.value);
          }}
        />
      </div>
    </div>
  );
};

export default ConsTextarea;
