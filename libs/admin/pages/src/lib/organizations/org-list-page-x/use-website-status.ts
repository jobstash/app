import { useQuery } from '@tanstack/react-query';
import myzod, { Infer } from 'myzod';

import {
  OrgWebsiteStatusItem,
  orgWebsiteStatusItemSchema,
} from '@jobstash/admin/core';

import { mwFetch } from '@jobstash/shared/data';

export const useWebsiteStatus = (websites: OrgWebsiteStatusItem[]) =>
  useQuery({
    queryKey: ['website-status', websites],
    async queryFn() {
      const url = `/api/url-status-proxy?urls=${encodeURIComponent(
        JSON.stringify(websites.flatMap(({ website }) => website)),
      )}`;

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

const responseSchema = myzod.object({
  success: myzod.boolean(),
  data: myzod.array(orgWebsiteStatusItemSchema),
});
