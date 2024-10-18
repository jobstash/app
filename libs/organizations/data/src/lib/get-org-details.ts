import {
  type OrgDetails,
  orgDetailsSchema,
} from '@jobstash/organizations/core';
import { MW_URL } from '@jobstash/shared/core';
import { getCommunityHeader } from '@jobstash/shared/utils';

import { mwFetch } from '@jobstash/shared/data';

interface Props {
  orgId: string;
  ssrHost?: string;
}

export const getOrgDetails = async ({ orgId, ssrHost }: Props) => {
  const url = `${MW_URL}/organizations/details/${orgId}`;

  const options = {
    responseSchema: orgDetailsSchema,
    sentryLabel: `getOrgDetails`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    headers: {
      ...getCommunityHeader(ssrHost),
    },
  };

  return mwFetch<OrgDetails>(url, options);
};
