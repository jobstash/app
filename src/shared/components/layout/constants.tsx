import { SidebarIcon } from '../icons';

import type { SidebarTab } from './types';

export const discoverTabs: SidebarTab[] = [
  {
    left: <SidebarIcon filename="jobs" />,
    label: 'Jobs',
    baseHref: '/jobs',
    intent: 'secondary',
  },
  {
    left: <SidebarIcon filename="orgs" />,
    label: 'Organizations',
    baseHref: '/organizations',
    intent: 'secondary',
  },
  {
    left: <SidebarIcon filename="projects" />,
    label: 'Projects',
    baseHref: '/projects',
    intent: 'secondary',
  },
  {
    left: <SidebarIcon filename="repos" />,
    label: 'Repositories',
    baseHref: '/repositories',
    intent: 'secondary',
  },
];

export const bookmarkedTabs = [
  {
    left: <SidebarIcon filename="bookmark" />,
    label: 'Saved Jobs',
    baseHref: '/bookmark/jobs',
    intent: 'secondary',
  },
  {
    left: <SidebarIcon filename="bookmark" />,
    label: 'Saved Orgs',
    baseHref: '/bookmark/orgs',
    intent: 'secondary',
  },
];
