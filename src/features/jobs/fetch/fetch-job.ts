import {
  ERR_INTERNAL,
  NEXT_PUBLIC_MW_URL,
  SENTRY_MW_NON_200_RESPONSE,
  SENTRY_MW_NON_JSON_RESPONSE,
} from '~/shared/core/constants';
import { sentryMessage } from '~/shared/utils';

import { JobListResult } from '../core/types';

const SENTRY_LABEL = `fetchJobPost`;

export const fetchJob = async (shortUuid: string): Promise<JobListResult> => {
  const res = await fetch(`${NEXT_PUBLIC_MW_URL}/jobs/details/${shortUuid}`);

  if (!res.ok) {
    sentryMessage(SENTRY_LABEL, SENTRY_MW_NON_200_RESPONSE);
    throw new Error(ERR_INTERNAL);
  }

  let data: JobListResult;

  try {
    data = await res.json();
  } catch {
    sentryMessage(SENTRY_LABEL, SENTRY_MW_NON_JSON_RESPONSE);
    throw new Error(ERR_INTERNAL);
  }

  return data;
};
