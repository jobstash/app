import {
  type JobPost,
  jobSeniorityMapping,
  jobSenioritySet,
} from '@jobstash/jobs/core';
import { TAG_ELEMENT_ID, type TagElement } from '@jobstash/shared/core';
import { capitalize, numFormatter } from '@jobstash/shared/utils';

import {
  EthereumIcon,
  LevelIcon,
  LocationIcon,
  MoneyIcon,
  SuitcaseIcon,
  TokenAllocationIcon,
} from '@jobstash/shared/ui';

export const createJobCardTags = (jobPost: JobPost) => {
  const {
    seniority,
    minSalaryRange,
    maxSalaryRange,
    jobLocation,
    jobCommitment,
    paysInCrypto,
    offersTokenAllocation,
  } = jobPost;

  const tags: TagElement[] = [];

  if (seniority && seniority !== 'undefined') {
    let label = '';

    for (const [k, v] of Object.entries(jobSeniorityMapping)) {
      if (v === seniority) {
        label = k;
      }
    }

    if (jobSenioritySet.has(label)) {
      tags.push({
        id: TAG_ELEMENT_ID.seniority,
        text: label.length > 0 ? label : seniority,
        icon: <LevelIcon />,
      });
    }
  }

  if (minSalaryRange && maxSalaryRange) {
    const salary = `$${numFormatter.format(
      minSalaryRange,
    )} - $${numFormatter.format(maxSalaryRange)}`;
    tags.push({
      id: TAG_ELEMENT_ID.salary,
      text: `Salary: ${salary}`,
      icon: <MoneyIcon />,
    });
  }

  if (jobLocation && jobLocation !== 'unspecified') {
    tags.push({
      id: TAG_ELEMENT_ID.location,
      text: capitalize(jobLocation),
      icon: <LocationIcon />,
    });
  }

  if (jobCommitment) {
    tags.push({
      id: TAG_ELEMENT_ID.commitment,
      text: jobCommitment,
      icon: <SuitcaseIcon />,
    });
  }

  if (paysInCrypto) {
    tags.push({
      id: TAG_ELEMENT_ID.paysInCrypto,
      text: 'Pays in Crypto',
      icon: <EthereumIcon />,
    });
  }

  if (offersTokenAllocation) {
    tags.push({
      id: TAG_ELEMENT_ID.offersTokenAllocation,
      text: 'Offers Token Allocation',
      icon: <TokenAllocationIcon />,
    });
  }

  return tags;
};
