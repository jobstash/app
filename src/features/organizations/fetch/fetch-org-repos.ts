import { ERR_INTERNAL, NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';
import { Repository } from '~/shared/core/interfaces';
import { sentryMessage } from '~/shared/utils';

interface OrgReposResponse {
  success: boolean;
  message: string;
  data: Repository[];
}

const SENTRY_LABEL = `fetcgOrgRepos`;

export const fetcgOrgRepos = async (orgId: string): Promise<Repository[]> => {
  const res = await fetch(
    `${NEXT_PUBLIC_MW_URL}/organizations/repositories/${orgId}`,
  );

  let resData: OrgReposResponse;

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
