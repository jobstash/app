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

export const devBarTabs: SidebarTab[] = [
  {
    icon: null,
    label: 'My Profile',
  },
  {
    icon: null,
    label: 'My Repositories',
  },
];
