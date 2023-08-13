import { createContext, useContext } from 'react';

import { ProfileOrgReview } from '@jobstash/profile/core';

interface SalaryFormContextProps {
  state: {
    currency: string | null;
    amount: number | null;
    token: string | null;
    noAllocation: boolean;
  };
  setState: {
    setCurrency: (value: string | null) => void;
    setAmount: (value: number | null) => void;
    setToken: (value: string | null) => void;
    setNoAllocation: (value: boolean) => void;
  };
  save: () => void;
  isLoading: boolean;
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
