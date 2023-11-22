import { Textarea } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { useYourContributionContext } from '@jobstash/profile/state';

const Input = () => {
  const { contribution, setContribution } = useYourContributionContext();

  return (
    <div className="flex justify-center w-full">
      <Textarea
        autosize
        inputWrapperOrder={['input', 'description']}
        descriptionProps={{
          className: 'text-right pt-2 pr-2',
        }}
        wrapperProps={{
          className: 'w-full py-2',
        }}
        w="98%"
        minRows={10}
        classNames={{
          input: cn(
            'rounded-lg bg-dark-gray text-white/60 focus:border-white p-4',
          ),
        }}
        value={contribution}
        description={`${500 - contribution.length} characters left`}
        onChange={(e) => {
          const { value } = e.currentTarget;

          if (value.length <= 500) {
            setContribution(value);
          }
        }}
      />
    </div>
  );
};

export default Input;
