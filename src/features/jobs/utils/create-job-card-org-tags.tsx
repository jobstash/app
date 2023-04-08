import { BankIcon, MoneyIcon } from '~/shared/components';
import { Organization, TagElement } from '~/shared/core/interfaces';

export const createJobCardOrgTags = (org: Organization) => {
  const tags: TagElement[] = [
    {
      text: 'Last Funding: TBD',
      icon: <MoneyIcon />,
    },
    {
      text: 'Funding Date: TBD',
      icon: <BankIcon />,
    },
  ];

  return tags;
};
