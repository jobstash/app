import { useSalaryFormContext } from '@jobstash/profile/state';

import SalaryInput from './salary-input';

const SALARY_CURRENCY_OPTIONS = ['USD', 'EUR'];

const CurrencyInput = () => {
  const {
    state: { selectedCurrency },
    setState: { setSelectedCurrency },
  } = useSalaryFormContext();

  return (
    <SalaryInput
      title="Currency"
      options={SALARY_CURRENCY_OPTIONS}
      value={selectedCurrency}
      onChange={setSelectedCurrency}
    />
  );
};

export default CurrencyInput;
