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
    minimumSalary,
    maximumSalary,
    location,
    locationType,
    commitment,
    paysInCrypto,
    offersTokenAllocation,
    salaryCurrency = 'USD',
    classification,
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

  if (minimumSalary && maximumSalary) {
    const salary = `${salaryCurrency} ${numFormatter.format(
      minimumSalary,
    )} - ${numFormatter.format(maximumSalary)}`;
    tags.push({
      id: TAG_ELEMENT_ID.salary,
      text: `Salary: ${salary}`,
      icon: <MoneyIcon />,
    });
  }

  if (locationType === LOCATION_TYPE.REMOTE) {
    tags.push({
      id: TAG_ELEMENT_ID.locationType,
      text: REMOTE_TEXT,
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

  const commitmentText = getCommitmentText(commitment);
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

  const classificationText = getClassificationText(classification);
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

const COMMITMENT_TYPE_TEXT = {
  PART_TIME: 'Part Time',
  FULL_TIME: 'Full Time',
};

const getCommitmentText = (commitment: string | null) => {
  if (commitment && Object.keys(COMMITMENT_TYPE_TEXT).includes(commitment)) {
    return COMMITMENT_TYPE_TEXT[
      commitment as keyof typeof COMMITMENT_TYPE_TEXT
    ];
  }

  return null;
};

const getClassificationText = (classification: string | null) =>
  classification
    ?.replaceAll('_', ' ')
    .toLowerCase()
    .replaceAll(/\b\w/g, (s) => s.toUpperCase()) ?? null;
