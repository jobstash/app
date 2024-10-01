import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { ERR_INTERNAL } from '@jobstash/shared/core';
import { notifError, notifSuccess, openNewTab } from '@jobstash/shared/utils';

import { getJobPromotePaymentUrl } from '@jobstash/jobs/data';

import { useJobPromotePoll } from './use-job-promote-poll';

const SUCCESS_TITLE = 'Finalize Your Purchase';
const SUCCESS_MESSAGE =
  'The payment process is ready in the new tab. Please complete it to proceed.';

interface Props {
  id: string;
  isProtected: boolean;
  filterParams: Record<string, string>;
  endDate: number | null;
}

export const useJobPromotePaymentUrl = ({
  id,
  isProtected,
  filterParams,
  endDate,
}: Props) => {
  const [enabled, setEnabled] = useState(false);

  const { isEnabled, isUpdating } = useJobPromotePoll({
    id,
    enabled,
    setEnabled,
    isProtected,
    filterParams,
    endDate,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => getJobPromotePaymentUrl(id),
    onSuccess({ data }) {
      notifSuccess({
        title: SUCCESS_TITLE,
        message: SUCCESS_MESSAGE,
      });

      if (data) {
        openNewTab(data.url);
        setEnabled(true);
      }
    },
    onError(error) {
      notifError({
        title: ERR_INTERNAL,
        message: (error as Error).message,
      });
    },
  });

  return {
    isLoading: isPending || isEnabled || isUpdating,
    getPaymentUrl: mutate,
  };
};
