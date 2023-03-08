import { Organization, TagElement } from '~/shared/core/interfaces';

export const createRightPanelOrgCardTags = (org: Organization) => {
  const topTags: TagElement[] = [
    { text: 'Last Funding: TBD', iconText: 'funding' },
    { text: 'Funding Date: TBD', iconText: 'funding' },
    { text: 'TBD', iconText: 'money' },
    { text: 'TBD ', iconText: 'money' },
    { text: 'TBD  ', iconText: 'money' },
  ];
  const bottomTags: TagElement[] = [
    {
      text: `TVL Sum: TBD`,
    },
  ];

  return { topTags, bottomTags };
};
