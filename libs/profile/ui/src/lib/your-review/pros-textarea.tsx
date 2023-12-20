import { Textarea } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { useProfileOrgReviewFormContext } from '@jobstash/profile/state';

import { Heading, Text } from '@jobstash/shared/ui';

const ProsTextarea = () => {
  const {
    review: { pros },
    setPros,
  } = useProfileOrgReviewFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Heading size="md" fw="semibold">
          Pros
        </Heading>

        <Text color="dimmed">
          Tell others about things you liked about this organization and their
          style
        </Text>
      </div>
      <div className="w-full">
        <Textarea
          autosize
          inputWrapperOrder={['input', 'description']}
          descriptionProps={{
            className: 'text-right pt-2 pr-2',
          }}
          w="98%"
          minRows={10}
          classNames={{
            input: cn(
              'rounded-lg bg-dark-gray text-white/60 focus:border-white p-6',
            ),
          }}
          description={`${500 - (pros?.length ?? 0)} characters left`}
          value={pros ?? ''}
          onChange={(e) => {
            setPros(e.currentTarget.value);
          }}
        />
      </div>
    </div>
  );
};

export default ProsTextarea;
