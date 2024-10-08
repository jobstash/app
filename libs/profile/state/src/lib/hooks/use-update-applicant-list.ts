import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UpdateApplicantListPayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { updateApplicantList } from '@jobstash/profile/data';

interface Props {
  orgId: string;
  successCb?: () => void;
}

export const useUpdateApplicantList = ({ orgId, successCb }: Props) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: (payload: UpdateApplicantListPayload) =>
      updateApplicantList(orgId, payload),
    onSuccess({ message }, { list }) {
      notifSuccess({
        title: `Successfully updated applicants list`,
        message,
        autoClose: 10_000,
      });

      for (const list of ['all', 'new', 'shortlisted', 'archived']) {
        queryClient.invalidateQueries({
          queryKey: [mwVersion, 'job-applicants', orgId, list],
        });
      }

      if (successCb) {
        successCb();
      }
    },
    onError(data) {
      notifError({
        title: 'Applicant list update failed',
        message: (data as Error).message,
      });
    },
  });
};
