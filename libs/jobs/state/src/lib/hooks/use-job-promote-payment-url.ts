import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ERR_INTERNAL } from '@jobstash/shared/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getJobPromotePaymentUrl } from '@jobstash/jobs/data';

export const useJobPromotePaymentUrl = (uuid: string) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: () => getJobPromotePaymentUrl(uuid),
    onSuccess() {
      notifSuccess({
        title: 'Finalize Your Purchase',
        message:
          'The payment process is ready in the new tab. Please complete it to proceed.',
      });

      // TODO: Poll job-list page where uuid belongs
      // TODO: Stop poll after x mins
    },
    onError(error) {
      notifError({
        title: ERR_INTERNAL,
        message: (error as Error).message,
      });
    },
  });
};
