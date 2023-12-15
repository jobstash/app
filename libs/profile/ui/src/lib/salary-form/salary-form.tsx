import Actions from './actions';
import AmountInput from './amount-input';
import Checkbox from './checkbox';
import CurrencyInput from './currency-input';
import Header from './header';
import TourProvider from './tour-provider';

const SalaryForm = () => (
  <TourProvider>
    <div id="profile-right-panel-salary" className="flex flex-col gap-4">
      <Header />

      <div className="flex flex-col gap-6">
        <CurrencyInput />
        <AmountInput />
        <Checkbox />
        <Actions />
      </div>
    </div>
  </TourProvider>
);

export default SalaryForm;
