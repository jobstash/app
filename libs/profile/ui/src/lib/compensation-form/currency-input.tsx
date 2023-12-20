import { useProfileOrgReviewFormContext } from '@jobstash/profile/state';

import Input from './input';

const SALARY_CURRENCY_OPTIONS = ['USD', 'EUR'];

const CurrencyInput = () => {
  const {
    compensation: { currency },
    setCurrency: setSelectedCurrency,
  } = useProfileOrgReviewFormContext();

  return (
    <Input
      title="Currency"
      options={SALARY_CURRENCY_OPTIONS}
      value={currency}
      onChange={setSelectedCurrency}
    />
  );
};

export default CurrencyInput;
