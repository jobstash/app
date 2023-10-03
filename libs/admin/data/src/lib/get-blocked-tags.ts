import {
  type BlockedTagsResponse,
  blockedTagsResponseSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getBlockedTags = async () => {
  const url = `${MW_URL}/technologies/blocked-terms`;

  const options = {
    responseSchema: blockedTagsResponseSchema,
    sentryLabel: `getGodmodeBlockedTags`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<BlockedTagsResponse>(url, options);

  return response.data.map((t) => t.name);
};
