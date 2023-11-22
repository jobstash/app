import { useSalaryFormContext } from '@jobstash/profile/state';

import SalaryInput from './salary-input';

const AmountInput = () => {
  const {
    state: { amount, selectedCurrency },
    setState: { setAmount },
  } = useSalaryFormContext();

  return (
    <SalaryInput
      numberInput
      title="Amount (Per Year)"
      value={amount && selectedCurrency ? amount : ''}
      isDisabled={!selectedCurrency}
      onChange={(v: number | '') => setAmount(v ? Number(v) : null)}
    />
  );
};

export default AmountInput;
