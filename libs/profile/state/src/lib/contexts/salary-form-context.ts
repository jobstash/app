import { createContext, useContext } from 'react';

import { ProfileOrgReview } from '@jobstash/profile/core';

interface SalaryFormContextProps {
  state: {
    selectedCurrency: string | null;
    amount: number | null;
    offersTokenAllocation: boolean;
  };
  setState: {
    setSelectedCurrency: (value: string | null) => void;
    setAmount: (value: number | null) => void;
    setOffersTokenAllocation: (value: boolean) => void;
  };
  save: () => void;
  disableSave: boolean;
  orgReview: ProfileOrgReview;
}

export const SalaryFormContext = createContext<
  SalaryFormContextProps | undefined
>(undefined);

export const useSalaryFormContext = () => {
  const context = useContext(SalaryFormContext);
  if (!context) {
    throw new Error(
      'useSalaryFormContext must be used within a SalaryFormProvider',
    );
  }

  return context;
};
