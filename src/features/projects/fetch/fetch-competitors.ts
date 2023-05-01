import { ERR_INTERNAL, NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';
import type { Competitor } from '~/shared/core/interfaces';
import { sentryMessage } from '~/shared/utils';

interface ProjectCompetitorsResponse {
  success: boolean;
  message: string;
  data: Competitor[];
}

const SENTRY_LABEL = `fetchCompetitors`;

export const fetchCompetitors = async (id: string): Promise<Competitor[]> => {
  const res = await fetch(`${NEXT_PUBLIC_MW_URL}/projects/competitors/${id}`);

  let resData: ProjectCompetitorsResponse;

  try {
    resData = await res.json();
  } catch {
    sentryMessage(`${SENTRY_LABEL}`, 'Err res.json()');
    throw new Error(ERR_INTERNAL);
  }

  if (!res.ok || !resData.success) {
    sentryMessage(
      `${SENTRY_LABEL}: SENTRY_MW_NON_200_RESPONSE`,
      resData.message,
    );
    throw new Error(ERR_INTERNAL);
  }

  return resData.data;
};
