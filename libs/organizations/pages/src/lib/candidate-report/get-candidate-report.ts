import {
  CandidateReportPayload,
  CandidateReportResponse,
  candidateReportResponseSchema,
} from '@jobstash/organizations/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getCandidateReport = async ({
  github,
  wallet,
}: CandidateReportPayload) => {
  const url = `${MW_URL}/scorer/user/report?user=${github}&wallet=${wallet}`;

  const options = {
    responseSchema: candidateReportResponseSchema,
    sentryLabel: 'getCandidateReport',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<CandidateReportResponse>(url, options);
};
