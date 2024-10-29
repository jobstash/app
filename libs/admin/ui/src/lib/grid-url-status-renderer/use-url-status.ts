import { useQuery } from '@tanstack/react-query';
import myzod, { Infer } from 'myzod';

import { URL_DOMAINS, urlStatusSchema } from '@jobstash/admin/core';
import { FRONTEND_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const useUrlStatus = (
  urls: string,
  domainPrefix?: typeof URL_DOMAINS[keyof typeof URL_DOMAINS],
) =>
  useQuery({
    queryKey: ['url-status', urls],
    async queryFn() {
      const url = new URL(`${FRONTEND_URL}/api/url-status-proxy`);
      url.searchParams.set('urls', urls);
      if (domainPrefix) url.searchParams.set('domainPrefix', domainPrefix);

      const options = {
        responseSchema,
        sentryLabel: 'useUrlStatus',
      };

      const response = await mwFetch<Infer<typeof responseSchema>>(
        url.toString(),
        options,
      );

      return response.data;
    },
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(urls),
  });

const responseSchema = myzod.object({
  success: myzod.boolean(),
  data: myzod.array(urlStatusSchema),
});
