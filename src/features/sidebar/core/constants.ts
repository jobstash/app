import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';

export interface SidebarTab {
  icon:
    | 'jobs'
    | 'organizations'
    | 'projects'
    | 'repositories'
    | 'bookmark'
    | null;
  label: string;
}

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
  },
  {
    icon: null,
    label: 'Blocked Terms',
  },
  {
    icon: null,
    label: 'Organizations',
  },
  {
    icon: null,
    label: 'Approvals',
  },
  {
    icon: null,
    label: 'Imports',
  },
  {
    icon: null,
    label: 'Sales',
  },
];

export const roleSectionMap = {
  [CHECK_WALLET_ROLES.ANON]: null,
  [CHECK_WALLET_ROLES.ADMIN]: { title: 'God Mode', tabs: adminBartabs },
  [CHECK_WALLET_ROLES.DEV]: { title: 'Your Profile', tabs: devBartabs },
  [CHECK_WALLET_ROLES.ORG]: { title: 'Your Organization', tabs: devBartabs },
};
