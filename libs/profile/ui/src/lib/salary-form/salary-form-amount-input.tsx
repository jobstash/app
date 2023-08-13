import { NumberInput } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { useSalaryFormContext } from '@jobstash/profile/state';

const SalaryFormAmountInput = () => {
  const {
    state: { amount },
    setState: { setAmount },
  } = useSalaryFormContext();

  return (
    <NumberInput
      hideControls
      placeholder="(Per Year)"
      size="lg"
      classNames={{
        input: cn(
          'rounded-lg bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-md focus:border-white/40',
        ),
      }}
      value={amount ?? ''}
      onChange={(v) => setAmount(v ? Number(v) : null)}
    />
  );
};

export default SalaryFormAmountInput;
