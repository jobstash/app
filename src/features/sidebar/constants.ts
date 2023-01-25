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
    left: null,
    label: 'Jobs',
    baseHref: '/jobs',
  },
  {
    left: null,
    label: 'Organizations',
    baseHref: '/organizations',
  },
  {
    left: null,
    label: 'Projects',
    baseHref: '/projects',
  },
  {
    left: null,
    label: 'Repositories',
    baseHref: '/repositories',
  },
];

/** Tabs displayed for loggedin users
 * Notes:
 *  - left section is null for now (offset space for icon/avatar)
 * 	- baseHref is placeholder atm (will be discussed in the future)
 */
export const bookmarkedTabs = [
  {
    left: null,
    label: 'Saved Jobs',
    baseHref: '/bookmark/jobs',
  },
  {
    left: null,
    label: 'Companies',
    baseHref: '/bookmark/companies',
  },
];
