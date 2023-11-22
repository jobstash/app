import { type ReactNode } from 'react';

import { SalaryFormContext } from '../contexts/salary-form-context';
import { useSalaryForm } from '../hooks/use-salary-form';
import { useSalaryTour } from '../hooks/use-salary-tour';

interface Props {
  children: ReactNode;
}

export const SalaryFormProvider = ({ children }: Props) => {
  const value = useSalaryForm();

  useSalaryTour();

  return (
    <SalaryFormContext.Provider value={value}>
      <div id="profile-right-panel-salary" className="flex flex-col gap-4">
        {children}
      </div>
    </SalaryFormContext.Provider>
  );
};
