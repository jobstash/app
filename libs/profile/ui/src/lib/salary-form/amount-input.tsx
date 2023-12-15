import { useProfileOrgReviewFormContext } from '@jobstash/profile/state';

import SalaryInput from './salary-input';

const AmountInput = () => {
  const {
    salary: { amount, selectedCurrency },
    setAmount,
  } = useProfileOrgReviewFormContext();

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
