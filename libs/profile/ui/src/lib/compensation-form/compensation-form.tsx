import Actions from './actions';
import CurrencyInput from './currency-input';
import Header from './header';
import OffersTokenAllocationCheckbox from './offers-token-allocation-checkbox';
import SalaryInput from './salary-input';
import TourProvider from './tour-provider';

export const CompensationForm = () => (
  <TourProvider>
    <div id="profile-right-panel-salary" className="flex flex-col gap-4">
      <Header />

      <div className="flex flex-col gap-6">
        <CurrencyInput />
        <SalaryInput />
        <OffersTokenAllocationCheckbox />
        <Actions />
      </div>
    </div>
  </TourProvider>
);
