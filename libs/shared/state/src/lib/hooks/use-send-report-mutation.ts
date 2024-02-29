import { useMutation } from '@tanstack/react-query';

import { ReportPayload } from '@jobstash/shared/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { sendReport } from '@jobstash/shared/data';

import { useReportModal } from './use-report-modal';

export const useSendReportMutation = () => {
  const { close } = useReportModal();

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: (payload: ReportPayload) => sendReport(payload),
    onSuccess() {
      notifSuccess({
        title: 'Report has been sent!',
        message: 'Thank you for reporting the issue',
      });
      close();
    },
    onError(error) {
      notifError({
        title: 'Something went wrong :(',
        message: (error as Error)?.message ?? 'Please try again.',
      });
    },
  });

  return { isLoading, mutate };
};
