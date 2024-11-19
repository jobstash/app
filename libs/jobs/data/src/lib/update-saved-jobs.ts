import {
  type JobBookmarkPayload,
  jobBookmarkPayloadSchema,
} from '@jobstash/jobs/core';
import {
  MW_URL,
  MwMessageResponse,
  mwMessageResponseSchema,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

interface Params {
  payload: JobBookmarkPayload;
  shouldDelete?: boolean;
}

export const updateSavedJobs = async ({
  payload,
  shouldDelete = false,
}: Params) => {
  const url = `${MW_URL}/profile/jobs/bookmark`;

  const options = {
    method: shouldDelete ? ('DELETE' as const) : ('POST' as const),
    responseSchema: mwMessageResponseSchema,
    sentryLabel: 'addJobBookmark',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: jobBookmarkPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return mwFetch<MwMessageResponse, JobBookmarkPayload>(url, options);
};
