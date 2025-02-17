import { Competitor } from '@jobstash/competitors/core';
import { OrgDetails } from '@jobstash/organizations/core';
import { JobPost, MW_URL } from '@jobstash/shared/core';
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
      orgId: job.organization?.orgId,
      projects: job.organization?.projects,
      lastmod: new Date(job.timestamp).toISOString(),
    })))();

  const prefix = `${feUrl}/jobs`;

  const orgIds = new Set<string>();

  const fetchPromises = [];

  // Iterate jobs then generate urls
  for (const { key, orgId, projects, lastmod } of jobs) {
    // Add default urls
    urls.push(
      generateXmlUrl(`${prefix}/${key}/details`, lastmod),
      generateXmlUrl(`${prefix}/${key}/organization`, lastmod),
    );

    if (projects && projects.length > 0) {
      // Include projects link if has-project
      urls.push(generateXmlUrl(`${prefix}/${key}/projects`, lastmod));

      // Add orgs to set (deduped) to generate /other-jobs urls later
      if (orgId) {
        orgIds.add(orgId);
      }

      // Fetch competitor - if not empty, add to urls
      fetchPromises.push(
        fetch(`${MW_URL}/projects/competitors/${projects[0].id}`)
          .then(async (res) => {
            const result = await res.json();

            // Not sure why data is unreliable (sometimes array sometimes undefined)
            // Ensure defaults to empty array
            if (!result.data) {
              return { data: [] };
            }

            return result as { data: Competitor[] };
          })
          .then(({ data }) => {
            if (data.length > 0) {
              urls.push(
                generateXmlUrl(`${prefix}/${key}/competitors`, lastmod),
              );
            }
          }),
      );
    }
  }

  // Fetch org details -> create /other-jobs url for each job
  for (const orgId of orgIds) {
    fetchPromises.push(
      fetch(`${MW_URL}/organizations/details/${orgId}`).then(async (res) => {
        const result = await res.json();
        return result as OrgDetails;
      }),
      // .then((org) => {
      //   if (org.jobs.length > 0) {
      //     for (const job of org.jobs) {
      //       urls.push(
      //         generateXmlUrl(
      //           `${prefix}/${`${slugify(`${org.name} ${job.title} `)}${
      //             job.shortUUID
      //           }`}/other-jobs`,
      //         ),
      //       );
      //     }
      //   }
      // }),
    );
  }

  await Promise.all(fetchPromises);

  return urls;
};
