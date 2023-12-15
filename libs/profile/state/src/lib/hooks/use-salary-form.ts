import { useEffect, useState } from 'react';

import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

import { useSalaryMutation } from './use-salary-mutation';

export const useSalaryForm = () => {
  const { orgReview } = useProfileReviewsPageContext();

  const { org, salary } = orgReview;
  const { selectedCurrency, amount, offersTokenAllocation } = salary;

  const [state, setState] = useState({
    selectedCurrency,
    amount,
    offersTokenAllocation,
  });

  useEffect(() => {
    setState({
      selectedCurrency,
      amount,
      offersTokenAllocation,
    });
  }, [selectedCurrency, amount, offersTokenAllocation]);

  const { mutate } = useSalaryMutation();

  const save = () => {
    mutate({
      orgId: org.orgId,
      selectedCurrency: state.selectedCurrency,
      amount: state.amount ?? null,
      offersTokenAllocation: state.offersTokenAllocation,
    });
  };

  const disableSave =
    JSON.stringify({
      selectedCurrency,
      amount,
      offersTokenAllocation,
    }) === JSON.stringify(state);

  return {
    state,
    setState: {
      setSelectedCurrency: (value: string | null) =>
        setState((prev) => ({ ...prev, selectedCurrency: value })),
      setAmount: (value: number | null) =>
        setState((prev) => ({ ...prev, amount: value })),
      setOffersTokenAllocation: (value: boolean) =>
        setState((prev) => ({ ...prev, offersTokenAllocation: value })),
    },
    save,
    disableSave,
    orgReview,
  };
};
