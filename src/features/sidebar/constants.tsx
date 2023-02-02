import {
  BookmarkSidebarIcon,
  CodeSidebarIcon,
  HandbagSidebarIcon,
  ProjectsSidebarIcon,
  RepoSidebarIcon,
} from '../unstyled-ui/icons';

import type { SidebarTabs } from './types';
/**
 * These navs are common to anon/devs/orgs
 * 		anon -> anonymous users (not logged in)
 * 		devs -> loggedin devs browsing for jobs/companies
 * 		orgs -> loggedin orgs hiring developers
 * Notes:
 *   - left section is null for now (offset space for icon/avatar)
 */
export const discoverTabs: SidebarTabs[] = [
  {
    left: <CodeSidebarIcon />,
    label: 'Jobs',
    baseHref: '/jobs',
  },
  {
    left: <HandbagSidebarIcon />,
    label: 'Organizations',
    baseHref: '/organizations',
  },
  {
    left: <ProjectsSidebarIcon />,
    label: 'Projects',
    baseHref: '/projects',
  },
  {
    left: <RepoSidebarIcon />,
    label: 'Repositories',
    baseHref: '/repositories',
  },
];

/** Tabs displayed for loggedin users
 * Notes:
 *  - left section is null for now (offset space for icon/avatar)
 * 	- baseHref is placeholder atm (will be discussed in the future)
 */
export const bookmarkedTabs: SidebarTabs[] = [
  {
    left: <BookmarkSidebarIcon />,
    label: 'Saved Jobs',
    baseHref: '/bookmarks/jobs',
  },
  {
    left: <BookmarkSidebarIcon />,
    label: 'Saved Orgs',
    baseHref: '/bookmarks/orgs',
  },
];
