import type { GetServerSideProps } from 'next';

import type { Job } from '~/features/jobs/core/types';
import { createJobKey } from '~/features/jobs/utils';
import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';

const SiteMap = () => {};

export default SiteMap;

const generateSiteMap = (jobs: Job[]): string =>
  `<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			<url><loc>https://app.jobstash.xyz/jobs</loc></url>
			${jobs
        .map(
          (job) =>
            `<url><loc>https://app.jobstash.xyz/jobs/${createJobKey(
              job,
            )}/details</loc></url>`,
        )
        .join('')}
		</urlset>
	`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const req = await fetch(`${NEXT_PUBLIC_MW_URL}/jobs/list?page=1&limit=5000`);
  const jsonRes = await req.json();
  const { data } = jsonRes as { data: Job[] };

  const sitemap = generateSiteMap(data);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
