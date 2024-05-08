import { useQuery } from '@tanstack/react-query';
import myzod, { Infer } from 'myzod';

import { URL_DOMAINS, UrlStatus, urlStatusSchema } from '@jobstash/admin/core';
import { FRONTEND_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const useUrlStatus = (
  urls: UrlStatus[],
  domainPrefix?: typeof URL_DOMAINS[keyof typeof URL_DOMAINS],
) => {
  const urlsString = encodeURIComponent(
    JSON.stringify(urls.flatMap(({ url }) => url)),
  );

  return useQuery({
    queryKey: ['url-status', urlsString],
    async queryFn() {
      const url = new URL(`${FRONTEND_URL}/api/url-status-proxy`);
      url.searchParams.set('urls', urlsString);
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
  });
};

const responseSchema = myzod.object({
  success: myzod.boolean(),
  data: myzod.array(urlStatusSchema),
});
