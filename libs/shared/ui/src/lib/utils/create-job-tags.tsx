import { jobSeniorityMapping, jobSenioritySet } from '@jobstash/jobs/core';
import {
  type JobCardSet,
  TAG_ELEMENT_ID,
  type TagElement,
} from '@jobstash/shared/core';
import { capitalize, numFormatter } from '@jobstash/shared/utils';

import CategoryIcon from '../icons/category-icon';
import EthereumIcon from '../icons/ethereum-icon';
import LevelIcon from '../icons/level-icon';
import LocationIcon from '../icons/location-icon';
import MoneyIcon from '../icons/money-icon';
import RemoteIcon from '../icons/remote-icon';
import SuitcaseIcon from '../icons/suitcase-icon';
import TokenAllocationIcon from '../icons/token-allocation-icon';

export const createJobTags = (jobCardSet: JobCardSet) => {
  const {
    seniority,
    location,
    locationType,
    commitment,
    paysInCrypto,
    offersTokenAllocation,
    classification,
    salaryCurrency,
  } = jobCardSet;

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

  const salaryText = getSalaryText(jobCardSet);
  if (salaryText && salaryCurrency) {
    tags.push({
      id: TAG_ELEMENT_ID.salary,
      text: `Salary: ${salaryCurrency} ${salaryText}`,
      icon: <MoneyIcon />,
    });
  }

  if (locationType) {
    tags.push({
      id: TAG_ELEMENT_ID.locationType,
      text: capitalize(locationType, true),
      icon: <RemoteIcon />,
    });
  }

  const loc = getLocationText(location, locationType);
  if (loc && loc !== 'unspecified') {
    tags.push({
      id: TAG_ELEMENT_ID.location,
      text: capitalize(loc),
      icon: <LocationIcon />,
    });
  }

  const commitmentText = getTitleCase(commitment);
  if (commitmentText) {
    tags.push({
      id: TAG_ELEMENT_ID.commitment,
      text: capitalize(commitmentText),
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

  const classificationText = getTitleCase(classification);
  if (classificationText) {
    tags.push({
      id: TAG_ELEMENT_ID.classification,
      text: classificationText,
      icon: <CategoryIcon />,
    });
  }

  return tags;
};

const GLOBAL_TEXT = 'Global';
const REMOTE_TEXT = 'Remote';
const LOCATION_TYPE = {
  REMOTE: 'REMOTE',
  ONSITE: 'ONSITE',
};

const getLocationText = (
  location: string | null,
  type: string | null,
): string | null => {
  if (type === LOCATION_TYPE.REMOTE) {
    return (
      location
        ?.replace(REMOTE_TEXT, '')
        .replace(GLOBAL_TEXT, '')
        .replaceAll(/\W+/g, ' ')
        .trim() ?? null
    );
  }

  return location ?? null;
};

const getTitleCase = (classification: string | null) =>
  classification
    ?.replaceAll('_', ' ')
    .toLowerCase()
    .replaceAll(/\b\w/g, (s) => s.toUpperCase()) ?? null;

const getSalaryText = (job: JobCardSet) => {
  const { minimumSalary, maximumSalary, salary } = job;

  if (minimumSalary && maximumSalary) {
    return `${numFormatter.format(minimumSalary)} - ${numFormatter.format(
      maximumSalary,
    )}`;
  }

  const isNotRange = [minimumSalary, maximumSalary].includes(null);
  if (salary && isNotRange) return `${numFormatter.format(salary)}`;

  return null;
};
