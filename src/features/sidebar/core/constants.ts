import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';

import { SidebarRoleSection, SidebarTab } from './types';

export const discoverBartabs: SidebarTab[] = [
  {
    icon: 'jobs',
    label: 'Jobs',
  },
  {
    icon: 'organizations',
    label: 'Organizations',
  },
  {
    icon: 'projects',
    label: 'Projects',
  },
  {
    icon: 'repositories',
    label: 'Repositories',
  },
];

export const bookmarkBartabs: SidebarTab[] = [
  {
    icon: 'bookmark',
    label: 'Saved Jobs',
  },
  {
    icon: 'bookmark',
    label: 'Saved Orgs',
  },
];

export const devBartabs: SidebarTab[] = [
  {
    icon: null,
    label: 'My Profile',
  },
  {
    icon: null,
    label: 'My Repositories',
  },
];

export const orgBartabs: SidebarTab[] = [
  {
    icon: null,
    label: 'My Projects',
  },
  {
    icon: null,
    label: 'My Jobs',
  },
  {
    icon: null,
    label: 'My Repositories',
  },
  {
    icon: null,
    label: 'Get Developers',
  },
];

export const adminBartabs: SidebarTab[] = [
  {
    icon: null,
    label: 'Synonyms',
    path: '/godmode/synonyms',
  },
  {
    icon: null,
    label: 'Blocked Terms',
    path: '/godmode/blocked-terms',
  },
  {
    icon: null,
    label: 'Connected Terms',
    path: '/godmode/connected-terms',
  },
  {
    icon: null,
    label: 'Organizations',
    path: '/godmode/organizations',
  },
  {
    icon: null,
    label: 'Approvals',
    path: '/godmode/approvals/organizations',
  },
  {
    icon: null,
    label: 'Imports',
    path: '/godmode/imports',
  },
  {
    icon: null,
    label: 'Sales',
    path: '/godmode/sales',
  },
];

export const roleSectionMap: Record<
  keyof typeof CHECK_WALLET_ROLES,
  SidebarRoleSection
> = {
  [CHECK_WALLET_ROLES.ANON]: null,
  [CHECK_WALLET_ROLES.ADMIN]: {
    title: 'God Mode',
    tabs: adminBartabs,
    isActiveFn: ({ aspath, tab: { path } }) => path === aspath,
  },
  [CHECK_WALLET_ROLES.DEV]: {
    title: 'Your Profile',
    tabs: devBartabs,
    isActiveFn: () => false,
  },
  [CHECK_WALLET_ROLES.ORG]: {
    title: 'Your Organization',
    tabs: orgBartabs,
    isActiveFn: () => false,
  },
};
