import { Select } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import {
  useProfileReviewsPageContext,
  useSalaryFormContext,
} from '@jobstash/profile/state';

const SalaryFormTokenInput = () => {
  const {
    orgReview: { salary },
  } = useProfileReviewsPageContext();
  const { state, setState } = useSalaryFormContext();

  return (
    <Select
      disabled={state.noAllocation}
      data={salary.token.options}
      value={state.noAllocation ? null : state.token}
      placeholder={state.noAllocation ? '' : 'Select ...'}
      size="lg"
      classNames={{
        input: cn(
          'rounded-lg bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
        ),
        itemsWrapper: 'bg-dark-gray',
        item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
      }}
      onChange={setState.setToken}
    />
  );
};

export default SalaryFormTokenInput;
