import { MW_URL, ProjectInfo } from '@jobstash/shared/core';
import { generateXmlUrl, slugify } from '@jobstash/shared/utils';

export const generateProjectSitemapUrls = async (feUrl: string) => {
  const urls = await fetch(`${MW_URL}/projects/list?page=1&limit=5000`)
    .then((res) => res.json())
    .then(({ data }) => data as ProjectInfo[])
    .then((projects) => {
      const urls: string[] = [];
      for (const project of projects) {
        const { id, name } = project;
        const prefix = `${feUrl}/projects/${slugify(`${name} ${id}`)}`;
        urls.push(
          generateXmlUrl(`${prefix}/details`),
          generateXmlUrl(`${prefix}/organization`),
        );
      }

      return urls;
    });

  return urls;
};
