/* eslint-disable complexity */
import {
  JobDetails,
  jobDetailsSchema,
  JobListQueryPage,
  JobPost,
  jobPostSchema,
} from '@jobstash/jobs/core';
import { Organization, organizationSchema } from '@jobstash/organizations/core';
import { Project, projectSchema } from '@jobstash/projects/core';
import {
  FundingRound,
  fundingRoundSchema,
  Investor,
  investorSchema,
  Tag,
  tagSchema,
} from '@jobstash/shared/core';

/**
 * Notes on this test:
 * 	- this should ONLY be manually triggered (by remove .skip)
 * 	- this should NOT be included in automated testing
 * 	- you need to run export NODE_TLS_REJECT_UNAUTHORIZED = 0 on the jest terminal
 * 		- because fuck jest, they dont have solution for self-signed SSL
 * 	- you need mw running at address set by NEXT_PUBLIC_MW_URL env
 */

describe.skip('Job List Validation', () => {
  let jobPosts: JobPost[];

  beforeAll(async () => {
    const mwUrl = 'https://localhost:8080';
    const page = 1;
    const limit = 1000;

    const res = await fetch(`${mwUrl}/jobs/list?page=${page}&limit=${limit}`);

    if (!res.ok) {
      throw new Error('!res.ok');
    }

    let jobListQueryPage: JobListQueryPage;

    try {
      jobListQueryPage = await res.json();
    } catch {
      throw new Error('Invalid JSON data');
    }

    const { data } = jobListQueryPage;
    jobPosts = data;
  });

  test('validate job-lists', async () => {
    const allInvestorsSet = new Set();
    const allInvestors: Investor[] = [];
    const duplicatedInvestors: { id: string; name: string; jobPost: string }[] =
      [];

    const allFundingRoundsSet = new Set();
    const allFundingRounds: FundingRound[] = [];
    const duplicatedFundingRound: {
      id: string;
      name: string | null;
      jobPost: string;
    }[] = [];

    const allProjectsSet = new Set();
    const allProjects: Project[] = [];
    const duplicatedProjects: { id: string; name: string; jobPost: string }[] =
      [];

    const allTagsSet = new Set();
    const allTags: Tag[] = [];
    const duplicatedTags: {
      id: string;
      name: string;
      jobPost: string;
    }[] = [];

    const allOrganizationsSet = new Set();
    const allOrganizations: Organization[] = [];
    const duplicatedOrganizations: {
      id: string;
      name: string;
      jobPost: string;
    }[] = [];

    const allJobDetailsSet = new Set();
    const allJobDetails: JobDetails[] = [];
    const duplicatedJobDetails: string[] = [];

    for (const jobPost of jobPosts) {
      const investorsSet = new Set();
      for (const investor of jobPost.organization.investors) {
        // Append to allInvestors only if not yet present
        if (!allInvestorsSet.has(investor.id)) {
          allInvestorsSet.add(investor.id);
          allInvestors.push(investor);
        }

        // Check duplicate investors for current fundingRound
        if (investorsSet.has(investor.id)) {
          duplicatedInvestors.push({
            id: investor.id,
            name: investor.name,
            jobPost: jobPost.shortUUID,
          });
        } else {
          investorsSet.add(investor.id);
        }
      }

      const fundingRoundsSet = new Set();
      for (const fundingRound of jobPost.organization.fundingRounds) {
        // Append to allFundingRounds only if not yet present
        if (!allFundingRoundsSet.has(fundingRound.id)) {
          allFundingRoundsSet.add(fundingRound.id);
          allFundingRounds.push(fundingRound);
        }

        // Check duplicate fundingRound for current jobPost
        if (fundingRoundsSet.has(fundingRound.id)) {
          duplicatedFundingRound.push({
            id: fundingRound.id,
            name: fundingRound.roundName,
            jobPost: jobPost.shortUUID,
          });
        } else {
          fundingRoundsSet.add(fundingRound.id);
        }
      }

      const projectsSet = new Set();
      for (const project of jobPost.organization.projects) {
        // Append to allProjects only if not yet present
        if (!allProjectsSet.has(project.id)) {
          allProjectsSet.add(project.id);
          allProjects.push(project);
        }

        // Check duplicate project for current jobPost
        if (projectsSet.has(project.id)) {
          duplicatedProjects.push({
            id: project.id,
            name: project.name,
            jobPost: jobPost.shortUUID,
          });
        } else {
          projectsSet.add(project.id);
        }
      }

      const tagsSet = new Set();
      for (const tag of jobPost.tags) {
        // Append to allProjects only if not yet present
        if (!allTagsSet.has(tag.id)) {
          allTagsSet.add(tag.id);
          allTags.push(tag);
        }

        // Check duplicate project for current jobPost
        if (tagsSet.has(tag.id)) {
          duplicatedProjects.push({
            id: tag.id,
            name: tag.name,
            jobPost: jobPost.shortUUID,
          });
        } else {
          tagsSet.add(tag.id);
        }
      }

      // Append to allOrganizations only if not yet present
      if (!allOrganizationsSet.has(jobPost.organization.id)) {
        allOrganizationsSet.add(jobPost.organization.id);
        allOrganizations.push(jobPost.organization);
      }

      // Append to allJobDetails only if not yet present
      if (allJobDetailsSet.has(jobPost.shortUUID)) {
        duplicatedJobDetails.push(jobPost.shortUUID);
      } else {
        allJobDetailsSet.add(jobPost.shortUUID);
        const {
          id,
          shortUUID,
          jobTitle,
          jobLocation,
          jobCommitment,
          jobCreatedTimestamp,
          jobApplyPageUrl,
          minSalaryRange,
          maxSalaryRange,
          seniority,
          role,
          benefits,
          team,
          culture,
          offersTokenAllocation,
          paysInCrypto,
          salaryCurrency,
        } = jobPost;

        allJobDetails.push({
          id,
          shortUUID,
          jobTitle,
          jobLocation,
          jobCommitment,
          jobCreatedTimestamp,
          jobApplyPageUrl,
          minSalaryRange,
          maxSalaryRange,
          seniority,
          role,
          benefits,
          team,
          culture,
          offersTokenAllocation,
          paysInCrypto,
          salaryCurrency,
        });
      }
    }

    const report = {
      investors: {
        totalCount: allInvestors.length,
        duplicate: duplicatedInvestors.length,
        duplicateData: duplicatedInvestors,
      },
      fundingRounds: {
        totalCount: allFundingRounds.length,
        duplicate: duplicatedFundingRound.length,
        duplicateData: duplicatedFundingRound,
      },
      projects: {
        totalCount: allProjects.length,
        duplicate: duplicatedProjects.length,
        duplicateData: duplicatedProjects,
      },
      tags: {
        totalCount: allTags.length,
        duplicate: duplicatedTags.length,
        duplicateData: duplicatedTags,
      },
      organizations: {
        totalCount: allOrganizations.length,
        duplicate: duplicatedOrganizations.length,
        duplicateData: duplicatedOrganizations,
      },
      jobDetails: {
        totalCount: allJobDetails.length,
        duplicate: duplicatedJobDetails.length,
        duplicateData: JSON.stringify(duplicatedJobDetails),
      },
    };

    console.table(report);
    console.log('duplicatedJobDetails =', duplicatedJobDetails);

    // JobPost duplicated shortUuid
    //   const duplicatedIdReport: Record<string, number> = {};
    //   for (const duplicatedId of duplicatedJobDetails) {
    //     let count = 0;
    //     for (const jobPost of jobPosts) {
    //       if (duplicatedId === jobPost.shortUUID) {
    //         count += 1;
    //       }
    //     }

    //     duplicatedIdReport[duplicatedId] = count;
    //   }

    //   console.table(duplicatedIdReport);

    for (const investor of allInvestors) {
      investorSchema.parse(investor);
    }

    for (const fundingRound of allFundingRounds) {
      fundingRoundSchema.parse(fundingRound);
    }

    for (const project of allProjects) {
      projectSchema.parse(project);
    }

    for (const tag of allTags) {
      tagSchema.parse(tag);
    }

    for (const organization of allOrganizations) {
      organizationSchema.parse(organization);
    }

    for (const jobDetails of allJobDetails) {
      jobDetailsSchema.parse(jobDetails);
    }

    for (const jobPost of jobPosts) {
      jobPostSchema.parse(jobPost);
    }
  });
});
