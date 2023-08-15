import { SalaryFormProvider } from '@jobstash/profile/state';

import SalaryFormActions from './salary-form-actions';
import SalaryFormAmountInput from './salary-form-amount-input';
import SalaryFormCurrencyInput from './salary-form-currency-input';
import SalaryFormHeader from './salary-form-header';
import SalaryFormNoAllocationCheckbox from './salary-form-no-allocation-checkbox';
import SalaryFormTokenInput from './salary-form-token-input';

const SalaryForm = () => (
  <SalaryFormProvider>
    <SalaryFormHeader />

    <div className="flex flex-col gap-6">
      <SalaryFormCurrencyInput />
      <SalaryFormAmountInput />
      <SalaryFormTokenInput />
      <SalaryFormNoAllocationCheckbox />
      <SalaryFormActions />
    </div>
  </SalaryFormProvider>
);

export default SalaryForm;
