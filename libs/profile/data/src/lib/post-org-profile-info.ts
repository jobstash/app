import {
  OrgProfileInfoPayload,
  orgProfileInfoPayloadSchema,
  OrgProfileInfoResponse,
  orgProfileInfoResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postOrgProfileInfo = async (payload: OrgProfileInfoPayload) => {
  const url = `${MW_URL}/profile/org/info`;

  const options = {
    method: 'POST' as const,
    responseSchema: orgProfileInfoResponseSchema,
    sentryLabel: 'postDevProfileInfo',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: orgProfileInfoPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data } = await mwFetch<OrgProfileInfoResponse, OrgProfileInfoPayload>(
    url,
    options,
  );

  return data;
};
