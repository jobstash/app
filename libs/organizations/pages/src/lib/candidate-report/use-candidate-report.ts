import { useMutation } from '@tanstack/react-query';

import { CandidateReportPayload } from '@jobstash/organizations/core';
import { notifError } from '@jobstash/shared/utils';

import { getCandidateReport } from './get-candidate-report';

export const useCandidateReport = () =>
  useMutation({
    mutationFn: (payload: CandidateReportPayload) =>
      getCandidateReport(payload),
    onError(error) {
      notifError({
        title: 'Error Fetching User Info!',
        message: error.message,
      });
    },
  });
