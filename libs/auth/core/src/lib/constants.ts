export const EVENT_SIWE_LOGIN = 'siwe-login';
export const EVENT_SIWE_LOGOUT = 'siwe-logout';

export const PERMISSIONS = {
  // Base tier user, used to gatekeep certain stuff for only auth users
  USER: 'USER' as const,
  // Has access to all pages
  SUPER_ADMIN: 'SUPER_ADMIN' as const,
  // Base tier admin, requires further perms to do anything
  ADMIN: 'ADMIN' as const,
  // Has access to org related user functionality like talent list etc.
  ORG_MEMBER: 'ORG_MEMBER' as const,
  // Has access to org billing and subscriptions
  ORG_OWNER: 'ORG_OWNER' as const,
  // Has talentpool subscription
  ORG_TALENTPOOL_USER: 'ORG_TALENTPOOL_USER' as const,
  // Has veri subscription
  ORG_VERI_USER: 'ORG_VERI_USER' as const,
  // Has access to project related admin functionality
  PROJECT_MANAGER: 'PROJECT_MANAGER' as const,
  // Has access to org related admin functionality
  ORG_MANAGER: 'ORG_MANAGER' as const,
  // Has access to tags related admin functionality
  TAGS_MANAGER: 'TAGS_MANAGER' as const,
};

export const ignoredPathnameRedirectSet = new Set<string>([
  '/callback/dev',
  '/callback/org',
  '/callback/dev/magic-login',
  '/callback/org/magic-login',
  '/callback/[userType]/magic-login',
]);
