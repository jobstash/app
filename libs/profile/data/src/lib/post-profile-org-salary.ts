import {
  type ProfileOrgSalaryPayload,
  profileOrgSalaryPayloadSchema,
  type ProfileOrgSalaryResponse,
  profileOrgSalaryResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postProfileOrgSalary = async (
  payload: ProfileOrgSalaryPayload,
) => {
  const url = `${MW_URL}/profile/reviews/salary`;

  const options = {
    method: 'POST' as const,
    responseSchema: profileOrgSalaryResponseSchema,
    sentryLabel: 'postProfileOrgSalary',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: profileOrgSalaryPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    ProfileOrgSalaryResponse,
    ProfileOrgSalaryPayload
  >(url, options);

  return { success, message };
};
