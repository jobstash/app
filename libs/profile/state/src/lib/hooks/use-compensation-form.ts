import { useEffect, useState } from 'react';

import { type ProfileCompensationContextProps } from '../contexts/profile-org-review-form-context';
import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

import { useSalaryMutation } from './use-salary-mutation';

export const useCompensationForm = (): ProfileCompensationContextProps => {
  const { orgReview } = useProfileReviewsPageContext();

  const { org, compensation } = orgReview;
  const { currency, salary, offersTokenAllocation } = compensation;

  const [state, setState] = useState({
    currency,
    salary,
    offersTokenAllocation,
  });

  useEffect(() => {
    setState({
      currency,
      salary,
      offersTokenAllocation,
    });
  }, [currency, salary, offersTokenAllocation]);

  const { mutate } = useSalaryMutation();

  const saveCompensation = () => {
    mutate({
      orgId: org.orgId,
      currency: state.currency,
      salary: state.salary ?? null,
      offersTokenAllocation: state.offersTokenAllocation,
    });
  };

  const isDisabledCompensationSave =
    JSON.stringify({
      currency,
      salary,
      offersTokenAllocation,
    }) === JSON.stringify(state);

  return {
    compensation: state,
    setCurrency: (value: string | null) =>
      setState((prev) => ({ ...prev, currency: value })),
    setSalary: (value: number | null) =>
      setState((prev) => ({ ...prev, salary: value })),
    setOffersTokenAllocation: (value: boolean) =>
      setState((prev) => ({ ...prev, offersTokenAllocation: value })),
    saveCompensation,
    isDisabledCompensationSave,
  };
};
