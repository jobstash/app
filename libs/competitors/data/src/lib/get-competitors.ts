import { type Competitor } from '@jobstash/competitors/core';
import {
  ERR_INTERNAL,
  SENTRY_MW_INVALID_JSON_RESPONSE,
  SENTRY_MW_NON_200_RESPONSE,
  SENTRY_MW_UNSUCCESSFUL_RESPONSE,
} from '@jobstash/shared/core';
import { getMwUrl, sentryMessage } from '@jobstash/shared/utils';

interface ProjectCompetitorsResponse {
  success: boolean;
  message: string;
  data: Competitor[];
}

const SENTRY_LABEL = `getCompetitors`;

export const getCompetitors = async (id?: string): Promise<Competitor[]> => {
  const mwUrl = getMwUrl();
  const res = await fetch(`${mwUrl}/projects/competitors/${id}`);

  let resData: ProjectCompetitorsResponse;

  if (!res.ok) {
    sentryMessage(
      `${SENTRY_LABEL}: ${SENTRY_MW_NON_200_RESPONSE}`,
      `status = ${res.status}`,
    );
    throw new Error(ERR_INTERNAL);
  }

  try {
    resData = await res.json();
  } catch {
    sentryMessage(SENTRY_LABEL, SENTRY_MW_INVALID_JSON_RESPONSE);
    throw new Error(ERR_INTERNAL);
  }

  if (!resData.success) {
    sentryMessage(
      `${SENTRY_LABEL}: ${SENTRY_MW_UNSUCCESSFUL_RESPONSE}`,
      JSON.stringify(resData),
    );
    throw new Error(ERR_INTERNAL);
  }

  return resData.data;
};
