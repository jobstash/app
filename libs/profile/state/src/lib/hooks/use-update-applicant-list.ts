import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UpdateApplicantListPayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { updateApplicantList } from '@jobstash/profile/data';

export const useUpdateApplicantList = (orgId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateApplicantListPayload) =>
      updateApplicantList(orgId, payload),
    onSuccess({ message }, { list }) {
      notifSuccess({
        title: `Successfully updated applicants list`,
        message,
        autoClose: 10_000,
      });

      queryClient.invalidateQueries({
        queryKey: ['job-applicants', orgId, list],
      });
    },
    onError(data) {
      notifError({
        title: 'Applicant list update failed',
        message: (data as Error).message,
      });
    },
  });
};
