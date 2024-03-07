export const ROUTE_SECTIONS = {
  JOBS: 'jobs' as const,
  ORGS: 'organizations' as const,
  PROJECTS: 'projects' as const,
} as const;
export type RouteSection = (typeof ROUTE_SECTIONS)[keyof typeof ROUTE_SECTIONS];

export const ROUTE_TABS = {
  SHARED: {
    DETAILS: 'details',
    ORG: 'organization',
  },
  JOBS: {
    PROJECTS: 'projects',
    COMPETITORS: 'competitors',
    OTHER_JOBS: 'other-jobs',
  },
};

export const HREFS = {
  HOME_PAGE: '/',
  JOBS_PAGE: `/${ROUTE_SECTIONS.JOBS}`,
  ORGS_PAGE: `/${ROUTE_SECTIONS.ORGS}`,
  PROJECTS_PAGE: `/${ROUTE_SECTIONS.PROJECTS}`,
} as const;

export const A11Y = {
  LINK: {
    BACK: 'Back',
    SIDEBAR: {
      JOBS: 'Jobs',
      ORGS: 'Organizations',
      PROJECTS: 'Projects',
    },
  },
} as const;

export const TEST_IDS = {
  MOBILE_MENU: 'mobile-menu',
  DETAILS_BACK: 'details-back',
  NAV_SECTION: 'nav-section',
} as const;

export const DEFAULT_CURRENCY = 'USD';

export const METADATA = {
  SITE_NAME: 'JobStash',
  SITE_SLOGAN: 'The Ultimate Crypto Native Job Aggregator',
  TWITTER_CARD: 'summary_large_image',
  TWITTER_CREATOR: '@jobstash_xyz',
  IMAGE_DIMENSION: { width: 1100, height: 576 } as const,
} as const;
