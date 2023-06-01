import type { GetServerSideProps } from 'next';

import { type JobPost } from '@jobstash/jobs/core';
import { createJobKey } from '@jobstash/jobs/utils';
import { getFrontendUrl, getMwUrl } from '@jobstash/shared/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const SiteMap = () => {};

const generateSiteMap = (jobs: JobPost[]): string =>
  `<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${jobs
        .map(
          (job) =>
            `<url>
							<loc>${getFrontendUrl()}/jobs/${createJobKey(job)}/details</loc>
							<lastmod>${new Date(job.jobCreatedTimestamp).toISOString()}</lastmod>
							<changefreq>monthly</changefreq>
							<priority>1.0</priority>
						</url>`,
        )
        .join('')}
		</urlset>
	`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const mwUrl = getMwUrl();
  const req = await fetch(`${mwUrl}/jobs/list?page=1&limit=5000`);
  const jsonRes = await req.json();
  const { data } = jsonRes as { data: JobPost[] };

  const sitemap = generateSiteMap(data);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
