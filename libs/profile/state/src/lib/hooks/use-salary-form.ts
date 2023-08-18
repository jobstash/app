import { useState } from 'react';

import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

import { useSalaryMutation } from './use-salary-mutation';

export const useSalaryForm = () => {
  const { orgReview } = useProfileReviewsPageContext();

  const { org, salary } = orgReview;
  const { currency, amount, token } = salary;

  const [state, setState] = useState({
    currency: currency.value,
    amount,
    token: token.value,
    noAllocation: token.noAllocation,
  });

  const { mutate } = useSalaryMutation();

  const save = () => {
    mutate({
      orgId: org.id,
      currencyValue: state.currency,
      salaryAmount: state.amount ?? null,
      token: state.token,
      noAllocation: state.noAllocation,
    });
  };

  const disableSave =
    JSON.stringify({
      currency: currency.value,
      amount,
      token: token.value,
      noAllocation: token.noAllocation,
    }) === JSON.stringify(state);

  return {
    state,
    setState: {
      setCurrency: (value: string | null) =>
        setState((prev) => ({ ...prev, currency: value })),
      setAmount: (value: number | null) =>
        setState((prev) => ({ ...prev, amount: value })),
      setToken: (value: string | null) =>
        setState((prev) => ({ ...prev, token: value })),
      setNoAllocation: (value: boolean) =>
        setState((prev) => ({ ...prev, noAllocation: value })),
    },
    save,
    disableSave,
    orgReview,
  };
};
