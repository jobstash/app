import { Select } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { useSalaryFormContext } from '@jobstash/profile/state';

const SalaryFormCurrencyInput = () => {
  const {
    orgReview,
    state: { currency },
    setState: { setCurrency },
  } = useSalaryFormContext();

  return (
    <Select
      data={orgReview.salary.currency.options}
      value={currency}
      placeholder="Select ..."
      size="lg"
      classNames={{
        input: cn(
          'rounded-lg bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
        ),
        itemsWrapper: 'bg-dark-gray',
        item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
      }}
      onChange={setCurrency}
    />
  );
};

export default SalaryFormCurrencyInput;
