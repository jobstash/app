import { SalaryFormProvider } from '@jobstash/profile/state';

import Actions from './actions';
import AmountInput from './amount-input';
import Checkbox from './checkbox';
import CurrencyInput from './currency-input';
import Header from './header';
import TourProvider from './tour-provider';

const SalaryForm = () => (
  <TourProvider>
    <SalaryFormProvider>
      <Header />

      <div className="flex flex-col gap-6">
        <CurrencyInput />
        <AmountInput />
        <Checkbox />
        <Actions />
      </div>
    </SalaryFormProvider>
  </TourProvider>
);

export default SalaryForm;
