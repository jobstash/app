const ADMIN_PATHS = {
  BLOCKED_TERMS: '/godmode/technologies/blocked-terms',
  PAIRED_TERMS: '/godmode/technologies/paired-terms',
  SYNONYMS: '/godmode/technologies/synonyms',
  TECHNOLOGY_APPROVALS: '/godmode/technologies/approvals',
  ORG_LIST: '/godmode/organizations',
  ORG_CREATE: '/godmode/organizations/create',
};

export const ADMIN_BREADCRUMBS = {
  BLOCKED_TERMS: [{ title: 'Blocked Terms', href: ADMIN_PATHS.BLOCKED_TERMS }],
  PAIRED_TERMS: [{ title: 'Paired Terms', href: ADMIN_PATHS.PAIRED_TERMS }],
  SYNONYMS: [{ title: 'Synonyms', href: ADMIN_PATHS.SYNONYMS }],
  TECHNOLOGY_APPROVALS: [
    { title: 'Technology Approvals', href: ADMIN_PATHS.TECHNOLOGY_APPROVALS },
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
      label: 'Technology Approvals',
      path: ADMIN_PATHS.TECHNOLOGY_APPROVALS,
    },
  ],
};
