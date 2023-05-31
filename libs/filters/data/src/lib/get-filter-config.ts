import { type FilterConfig } from '@jobstash/filters/core';
import {
  ERR_INTERNAL,
  NEXT_PUBLIC_MW_URL,
  SENTRY_MW_INVALID_JSON_RESPONSE,
  SENTRY_MW_NON_200_RESPONSE,
} from '@jobstash/shared/core';
import { sentryMessage } from '@jobstash/shared/utils';

const SENTRY_LABEL = `getFilterConfig`;

export const getFilterConfig = async (): Promise<FilterConfig> => {
  const res = await fetch(`${NEXT_PUBLIC_MW_URL}/jobs/filters`);

  if (!res.ok) {
    sentryMessage(
      `${SENTRY_LABEL}: ${SENTRY_MW_NON_200_RESPONSE}`,
      `status = ${res.status}`,
    );
    throw new Error(ERR_INTERNAL);
  }

  let data: FilterConfig;

  try {
    data = await res.json();
  } catch {
    sentryMessage(SENTRY_LABEL, SENTRY_MW_INVALID_JSON_RESPONSE);
    throw new Error(ERR_INTERNAL);
  }

  return data;
};
