import { useMutation } from '@tanstack/react-query';
import { saveAs } from 'file-saver';

import { CandidateReport } from '@jobstash/organizations/core';
import {
  ERR_INTERNAL,
  SENTRY_MW_NON_200_RESPONSE,
  VERI_URL,
} from '@jobstash/shared/core';
import { notifError, sentryMessage } from '@jobstash/shared/utils';

const SENTRY_LABEL = 'submitCandidateReport';
const FILE_NAME = 'candidate-report.png';

const downloadCandidateReport = async (payload: CandidateReport) => {
  const url = `${VERI_URL}/api/candidate-report`;

  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors' as RequestMode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const sentryMsg = JSON.stringify({
    user: payload.user,
    status: res.status,
    statusText: res.statusText,
  });

  if (!res.ok) {
    sentryMessage(`${SENTRY_LABEL}: ${SENTRY_MW_NON_200_RESPONSE}`, sentryMsg);
    throw new Error(ERR_INTERNAL);
  }

  let blob: Blob;

  try {
    blob = await res.blob();
  } catch {
    sentryMessage(`${SENTRY_LABEL}: res.blob() failed`, sentryMsg);
    throw new Error(ERR_INTERNAL);
  }

  try {
    saveAs(blob, FILE_NAME);
  } catch {
    sentryMessage(`${SENTRY_LABEL}: saveAs failed`, sentryMsg);
    throw new Error(ERR_INTERNAL);
  }
};

export const useDownloadCandidateReport = () =>
  useMutation({
    mutationFn: (payload: CandidateReport) => downloadCandidateReport(payload),
    onError(error) {
      notifError({
        title: 'Error Downloading report!',
        message: error.message,
      });
    },
  });
