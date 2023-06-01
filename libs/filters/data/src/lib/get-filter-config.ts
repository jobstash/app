import { type FilterConfig } from '@jobstash/filters/core';
import {
  ERR_INTERNAL,
  SENTRY_MW_INVALID_JSON_RESPONSE,
  SENTRY_MW_NON_200_RESPONSE,
} from '@jobstash/shared/core';
import { getMwUrl, sentryMessage } from '@jobstash/shared/utils';

const SENTRY_LABEL = `getFilterConfig`;

export const getFilterConfig = async (): Promise<FilterConfig> => {
  const mwURL = getMwUrl();
  const res = await fetch(`${mwURL}/jobs/filters`);

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
