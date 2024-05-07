export const GODMODE_PATH_PREFIX = {
  TAGS: '/godmode/tags',
  ORGANIZATIONS: '/godmode/organizations',
  ALL_JOBS: '/godmode/jobs',
};

export const ADMIN_PATHS = {
  BLOCKED_TERMS: `${GODMODE_PATH_PREFIX.TAGS}/blocked-terms`,
  PAIRED_TERMS: `${GODMODE_PATH_PREFIX.TAGS}/paired-terms`,
  SYNONYMS: `${GODMODE_PATH_PREFIX.TAGS}/synonyms`,
  TAG_APPROVALS: `${GODMODE_PATH_PREFIX.TAGS}/approvals`,
  ORG_LIST: GODMODE_PATH_PREFIX.ORGANIZATIONS,
  ORG_CREATE: `${GODMODE_PATH_PREFIX.ORGANIZATIONS}/create`,
  ORG_APPROVALS: `${GODMODE_PATH_PREFIX.ORGANIZATIONS}/approvals`,
  ALL_JOBS: GODMODE_PATH_PREFIX.ALL_JOBS,
};

export const ADMIN_BREADCRUMBS = {
  BLOCKED_TERMS: [{ title: 'Blocked Terms', href: ADMIN_PATHS.BLOCKED_TERMS }],
  PAIRED_TERMS: [{ title: 'Paired Terms', href: ADMIN_PATHS.PAIRED_TERMS }],
  SYNONYMS: [{ title: 'Synonyms', href: ADMIN_PATHS.SYNONYMS }],
  TECHNOLOGY_APPROVALS: [
    { title: 'Tag Approvals', href: ADMIN_PATHS.TAG_APPROVALS },
  ],
  ORG_LIST: [{ title: 'Organizations', href: ADMIN_PATHS.ORG_LIST }],
  ORG_CREATE: [
    { title: 'Organizations', href: ADMIN_PATHS.ORG_LIST },
    { title: 'Create Organization', href: ADMIN_PATHS.ORG_CREATE },
  ],
};

export const ADMIN_TABS = {
  TECHNOLOGIES: [
    { label: 'Synonyms', path: ADMIN_PATHS.SYNONYMS },
    { label: 'Paired Terms', path: ADMIN_PATHS.PAIRED_TERMS },
    { label: 'Blocked Terms', path: ADMIN_PATHS.BLOCKED_TERMS },
    {
      label: 'Tag Approvals',
      path: ADMIN_PATHS.TAG_APPROVALS,
    },
  ],
};

export const URL_DOMAINS = {
  TWITTER: 'twitter.com',
  TELEGRAM: 'telegram.me',
  GITHUB: 'github.com',
} as const;
