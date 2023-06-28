import { jobSeniorityMapping, jobSenioritySet } from '@jobstash/jobs/core';
import {
  type JobInfo,
  TAG_ELEMENT_ID,
  type TagElement,
} from '@jobstash/shared/core';
import { capitalize, numFormatter } from '@jobstash/shared/utils';

import EthereumIcon from '../icons/ethereum-icon';
import LevelIcon from '../icons/level-icon';
import LocationIcon from '../icons/location-icon';
import MoneyIcon from '../icons/money-icon';
import SuitcaseIcon from '../icons/suitcase-icon';
import TokenAllocationIcon from '../icons/token-allocation-icon';

export const createJobTags = (jobInfo: JobInfo) => {
  const {
    seniority,
    minSalaryRange,
    maxSalaryRange,
    jobLocation,
    jobCommitment,
    paysInCrypto,
    offersTokenAllocation,
    salaryCurrency = 'USD',
  } = jobInfo;

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
    const salary = `${salaryCurrency} ${numFormatter.format(
      minSalaryRange,
    )} - ${numFormatter.format(maxSalaryRange)}`;
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
