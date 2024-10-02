import { MouseEventHandler, useRef, useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { ERR_INTERNAL } from '@jobstash/shared/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

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

  const newWindowRef = useRef<Window | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: () => getJobPromotePaymentUrl(id),
    onSuccess({ data }) {
      notifSuccess({
        title: SUCCESS_TITLE,
        message: SUCCESS_MESSAGE,
      });

      if (data && newWindowRef.current) {
        newWindowRef.current.location.href = data.url;
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

  const onClick: MouseEventHandler = (e) => {
    e.preventDefault();
    const newWindow = window.open('', '_blank');
    newWindow?.document.write(DEFAULT_HTML);
    newWindowRef.current = newWindow;
    mutate();
  };

  return {
    isLoading: isPending || isEnabled || isUpdating,
    onClick,
  };
};

const DEFAULT_HTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Loading...</title>
      <style>
        body {
          margin: 0;
          background-color: #131217;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .spinner {
          border: 6px solid rgba(255, 255, 255, 0.2);
          border-top: 6px solid rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    </head>
    <body>
      <div class="spinner"></div>
    </body>
    </html>
  `;
