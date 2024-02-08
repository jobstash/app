import { TAB_SEGMENT } from '@jobstash/shared/core';
import { capitalize } from '@jobstash/shared/utils';

const tabPrefixMap = {
  details: 'Information, Investor and Details',
  jobs: 'Crypto Jobs',
};

const orgTabs = [
  TAB_SEGMENT.details,
  TAB_SEGMENT.jobs,
  TAB_SEGMENT.projects,
  TAB_SEGMENT.reviews,
];
const orgTabsSet = new Set(orgTabs);

export const createOrgPageTitle = (orgName: string, tab: string) => {
  const isOrgTab = orgTabsSet.has(tab as typeof orgTabs[number]);

  if (!isOrgTab) return `${orgName}`;

  const prefix = Object.keys(tabPrefixMap).includes(tab)
    ? tabPrefixMap[tab as keyof typeof tabPrefixMap]
    : capitalize(tab);

  return `${prefix} of ${orgName}`;
};
