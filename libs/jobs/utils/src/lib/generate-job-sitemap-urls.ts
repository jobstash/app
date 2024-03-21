import { Competitor } from '@jobstash/competitors/core';
import { JobPost } from '@jobstash/jobs/core';
import { OrgDetails } from '@jobstash/organizations/core';
import { MW_URL } from '@jobstash/shared/core';
import { generateXmlUrl, slugify } from '@jobstash/shared/utils';

import { createJobKey } from './create-job-key';

export const generateJobSiteMapUrls = async (feUrl: string) => {
  const fetchedJobs = await fetch(`${MW_URL}/jobs/list?page=1&limit=5000`)
    .then((res) => res.json())
    .then(({ data }) => data as JobPost[]);

  const urls: string[] = [];

  const jobs = (() =>
    fetchedJobs.map((job) => ({
      id: job.shortUUID,
      key: createJobKey(job),
      orgId: job.organization.orgId,
      projects: job.organization.projects,
      lastmod: new Date(job.timestamp).toISOString(),
    })))();

  const prefix = `${feUrl}/jobs`;

  const orgIds = new Set<string>();
  const competitorsPromises = [];

  // Iterate jobs then generate urls
  for (const { key, orgId, projects, lastmod } of jobs) {
    // Add default urls
    urls.push(
      generateXmlUrl(`${prefix}/${key}/details`, lastmod),
      generateXmlUrl(`${prefix}/${key}/organization`, lastmod),
    );

    if (projects.length > 0) {
      // Include projects link if has-project
      urls.push(generateXmlUrl(`${prefix}/${key}/projects`, lastmod));

      // Add orgs to set (deduped) to generate /other-jobs urls later
      orgIds.add(orgId);

      // Fetch competitor - if not empty, add to urls
      competitorsPromises.push(
        fetch(`${MW_URL}/projects/competitors/${projects[0].id}`)
          .then((res) => res.json() as Promise<{ data: Competitor[] }>)
          .then((jsonRes) => {
            if (jsonRes.data.length > 0) {
              urls.push(
                generateXmlUrl(`${prefix}/${key}/competitors`, lastmod),
              );
            }
          }),
      );
    }
  }

  await Promise.all(competitorsPromises);

  const orgDetailsPromises = [];

  // Fetch org details -> create /other-jobs url for each job
  for (const orgId of orgIds) {
    orgDetailsPromises.push(
      fetch(`${MW_URL}/organizations/details/${orgId}`)
        .then((res) => res.json() as Promise<OrgDetails>)
        .then((org) => {
          if (org.jobs.length > 0) {
            for (const job of org.jobs) {
              urls.push(
                generateXmlUrl(
                  `${prefix}/${`${slugify(`${org.name} ${job.title} `)}${
                    job.shortUUID
                  }`}/other-jobs`,
                ),
              );
            }
          }
        }),
    );
  }

  await Promise.all(orgDetailsPromises);

  return urls;
};
