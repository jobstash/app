import { Textarea } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { useProfileOrgReviewFormContext } from '@jobstash/profile/state';

import { Heading } from '@jobstash/shared/ui';

const YourReviewPros = () => {
  const {
    currentReview: { pros },
    setPros,
  } = useProfileOrgReviewFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Heading size="md" fw="semibold">
          Pros
        </Heading>
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

export default YourReviewPros;
