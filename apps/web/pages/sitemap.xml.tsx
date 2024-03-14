import type { GetServerSideProps } from 'next';

import { type JobPost } from '@jobstash/jobs/core';
import { MW_URL } from '@jobstash/shared/core';
import { createJobKey } from '@jobstash/jobs/utils';
import { getFrontendUrlSSR } from '@jobstash/shared/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const SiteMap = () => {};

const generateSiteMap = (jobs: JobPost[], feUrl: string): string =>
  `<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${jobs
        .map(
          (job) =>
            `<url>
							<loc>${feUrl}/jobs/${createJobKey(job)}/details</loc>
							<lastmod>${new Date(job.timestamp).toISOString()}</lastmod>
							<changefreq>monthly</changefreq>
							<priority>1.0</priority>
						</url>`,
        )
        .join('')}
		</urlset>
	`;

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const fetchResponse = await fetch(`${MW_URL}/jobs/list?page=1&limit=15`);
  const jsonRes = await fetchResponse.json();
  const { data } = jsonRes as { data: JobPost[] };

  const feUrl = getFrontendUrlSSR(req.headers.host);
  const sitemap = generateSiteMap(data, feUrl);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
