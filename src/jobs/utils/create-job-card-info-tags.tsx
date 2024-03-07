import { JobInfoTags } from '~/shared/core/schemas';
import { InfoTagProps } from '~/shared/core/types';
import { capitalize } from '~/shared/utils/capitalize';
import { CategoryIcon } from '~/shared/components/icons/category-icon';
import { EthereumIcon } from '~/shared/components/icons/ethereum-icon';
import { LocationIcon } from '~/shared/components/icons/location-icon';
import { LocationTypeIcon } from '~/shared/components/icons/location-type-icon';
import { PaperBillIcon } from '~/shared/components/icons/paper-bill-icon';
import { SeniorityIcon } from '~/shared/components/icons/seniority-icon';
import { SuitCaseIcon } from '~/shared/components/icons/suit-case-icon';
import { TokenAllocationIcon } from '~/shared/components/icons/token-allocation-icon';

import { createCommonInfoTagText } from './create-common-info-tag-text';
import { createLocationText } from './create-location-text';
import { createSalaryText } from './create-salary-text';
import { createSeniorityText } from './create-seniority-text';

export const createJobCardInfoTags = (job: JobInfoTags) => {
  const tags: InfoTagProps[] = [];

  const seniorityText = createSeniorityText(job.seniority);
  if (seniorityText) {
    tags.push({
      text: seniorityText,
      icon: <SeniorityIcon />,
    });
  }

  const salaryText = createSalaryText(job);
  if (salaryText) {
    tags.push({
      text: `Salary: ${job.salaryCurrency} ${salaryText}`,
      icon: <PaperBillIcon />,
    });
  }

  if (job.locationType) {
    tags.push({
      text: capitalize(job.locationType, true),
      icon: <LocationTypeIcon />,
    });
  }

  const location = createLocationText(job.location, job.locationType);
  if (location) {
    tags.push({
      text: capitalize(location),
      icon: <LocationIcon />,
    });
  }

  const commitment = createCommonInfoTagText(job.commitment);
  if (commitment) {
    tags.push({
      text: capitalize(commitment),
      icon: <SuitCaseIcon />,
    });
  }

  if (job.paysInCrypto) {
    tags.push({
      text: 'Pays in Crypto',
      icon: <EthereumIcon />,
    });
  }

  if (job.offersTokenAllocation) {
    tags.push({
      text: 'Offers Token Allocation',
      icon: <TokenAllocationIcon />,
    });
  }

  const classification = createCommonInfoTagText(job.classification);
  if (classification) {
    tags.push({
      text: classification,
      icon: <CategoryIcon />,
    });
  }

  return tags;
};
