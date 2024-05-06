import { useQuery } from '@tanstack/react-query';
import myzod, { Infer } from 'myzod';

import {
  OrgWebsiteStatusItem,
  orgWebsiteStatusItemSchema,
} from '@jobstash/admin/core';

import { mwFetch } from '@jobstash/shared/data';

export const useWebsiteStatus = (websites: OrgWebsiteStatusItem[]) => {
  const urls = encodeURIComponent(
    JSON.stringify(websites.flatMap(({ website }) => website)),
  );

  return useQuery({
    queryKey: ['website-status', urls],
    async queryFn() {
      const url = `/api/url-status-proxy?urls=${urls}`;

      const options = {
        responseSchema,
        sentryLabel: 'useWebsiteStatus',
      };

      const response = await mwFetch<Infer<typeof responseSchema>>(
        url,
        options,
      );

      return response.data;
    },
    staleTime: 1000 * 60 * 60,
  });
};

const responseSchema = myzod.object({
  success: myzod.boolean(),
  data: myzod.array(orgWebsiteStatusItemSchema),
});
