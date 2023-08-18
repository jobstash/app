import { useSalaryFormContext } from '@jobstash/profile/state';

import SalaryInput from './salary-input';

const SalaryFormCurrencyInput = () => {
  const {
    orgReview,
    state: { currency },
    setState: { setCurrency },
  } = useSalaryFormContext();

  return (
    <SalaryInput
      title="Currency"
      options={orgReview.salary.currency.options}
      value={currency}
      onChange={setCurrency}
    />
  );
};

export default SalaryFormCurrencyInput;
