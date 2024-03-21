import type { GetServerSideProps } from 'next';

import { generateJobSiteMapUrls } from '@jobstash/jobs/utils';
import { generateOrgSitemapUrls } from '@jobstash/organizations/utils';
import { generateProjectSitemapUrls } from '@jobstash/projects/utils';
import { generateXmlUrl, getFrontendUrlSSR } from '@jobstash/shared/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const SiteMap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const feUrl = getFrontendUrlSSR(req.headers.host);

  const [jobUrls, orgUrls, projectUrls] = await Promise.all([
    generateJobSiteMapUrls(feUrl),
    generateOrgSitemapUrls(feUrl),
    generateProjectSitemapUrls(feUrl),
  ]);

  const allUrls = [
    generateXmlUrl(`${feUrl}/`), // Homepage
    ...jobUrls,
    ...orgUrls,
    ...projectUrls,
  ];

  const content = `<?xml version="1.0" encoding="UTF-8"?>
  		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  			${allUrls.map((url) => url).join('')}
  		</urlset>
  	`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(content);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
