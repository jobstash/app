import {
    BookmarkSidebarIcon,
    CodeSidebarIcon,
    HandbagSidebarIcon,
    ProjectsSidebarIcon,
    RepoSidebarIcon,
  } from '../icons';
  
  /**
   * These navs are common to anon/devs/orgs
   * 		anon -> anonymous users (not logged in)
   * 		devs -> loggedin devs browsing for jobs/companies
   * 		orgs -> loggedin orgs hiring developers
   * Notes:
   *   - left section is null for now (offset space for icon/avatar)
   */
  export const discoverTabs = [
    {
      left: <CodeSidebarIcon />,
      label: 'Jobs',
      baseHref: '/jobs',
      intent: "secondary"
    },
    {
      left: <HandbagSidebarIcon />,
      label: 'Organizations',
      baseHref: '/organizations',
      intent: 'secondary'
    },
    {
      left: <ProjectsSidebarIcon />,
      label: 'Projects',
      baseHref: '/projects',
      intent: 'secondary'
    },
    {
      left: <RepoSidebarIcon />,
      label: 'Repositories',
      baseHref: '/repositories',
      intent: 'secondary'
    },
  ];
  
  /** Tabs displayed for loggedin users
   * Notes:
   *  - left section is null for now (offset space for icon/avatar)
   * 	- baseHref is placeholder atm (will be discussed in the future)
   */
  export const bookmarkedTabs = [
    {
      left: <BookmarkSidebarIcon />,
      label: 'Saved Jobs',
      baseHref: '/bookmark/jobs',
      intent: 'secondary'
    },
    {
      left: <BookmarkSidebarIcon />,
      label: 'Saved Orgs',
      baseHref: '/bookmark/orgs',
      intent: 'secondary'
    },
  ];
  