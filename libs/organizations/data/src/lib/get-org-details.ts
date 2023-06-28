import {
  type OrgDetails,
  orgDetailsSchema,
} from '@jobstash/organizations/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getOrgDetails = async (orgId: string) => {
  const url = `${MW_URL}/organizations/details/${orgId}`;

  const options = {
    responseSchema: orgDetailsSchema,
    sentryLabel: `getOrgDetails`,
  };

  return mwFetch<OrgDetails>(url, options);
};
