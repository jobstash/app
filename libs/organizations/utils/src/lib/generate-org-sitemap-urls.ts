import { OrgListItem } from '@jobstash/organizations/core';
import { MW_URL } from '@jobstash/shared/core';
import { generateXmlUrl, slugify } from '@jobstash/shared/utils';

export const generateOrgSitemapUrls = async (feUrl: string) => {
  const urls = await fetch(`${MW_URL}/organizations/list?page=1&limit=5000`)
    .then((res) => res.json())
    .then(({ data }) => data as OrgListItem[])
    .then((orgs) => {
      const urls: string[] = [];
      for (const org of orgs) {
        const { orgId, name, projectCount } = org;
        const prefix = `${feUrl}/organizations/${slugify(`${name} ${orgId}`)}`;
        urls.push(
          generateXmlUrl(`${prefix}/details`),
          generateXmlUrl(`${prefix}/reviews`),
        );

        //
        // if (jobCount > 0) urls.push(generateXmlUrl(`${prefix}/jobs`));

        if (projectCount > 0) urls.push(generateXmlUrl(`${prefix}/projects`));
      }

      return urls;
    });

  return urls;
};
