import { useSalaryFormContext } from '@jobstash/profile/state';

import SalaryInput from './salary-input';

const SalaryFormAmountInput = () => {
  const {
    state: { amount },
    setState: { setAmount },
  } = useSalaryFormContext();

  return (
    <SalaryInput
      numberInput
      title="Amount (Per Year)"
      value={amount ?? ''}
      onChange={(v: number | '') => setAmount(v ? Number(v) : null)}
    />
  );
};

export default SalaryFormAmountInput;
