export const EVENT_SIWE_LOGIN = 'siwe-login';
export const EVENT_SIWE_LOGOUT = 'siwe-logout';

export const CHECK_WALLET_ROLES = {
  ANON: 'ANON',
  ADMIN: 'ADMIN',
  DEV: 'DEV',
  ORG: 'ORG',
  DATA_JANITOR: 'DATA_JANITOR',
} as const;

export const CHECK_WALLET_FLOWS = {
  DEFAULT: 'LOGIN',
  PICK_ROLE: 'PICK-ROLE',
  ADD_GITHUB_REPO: 'ADD-GITHUB-REPO',
  ONBOARD_PROFILE: 'ONBOARD-PROFILE',
  ONBOARD_REPO: 'ONBOARD-REPO',
  ONBOARD_REVIEWS: 'ONBOARD-REVIEWS',
  SIGNUP_COMPLETE: 'SIGNUP-COMPLETE',
  ADMIN_SYNONYMS: 'SYNONYMS',
  ADMIN_COMPLETE: 'ADMIN-COMPLETE',
  ORG_PROFILE: 'ORG-PROFILE',
  ORG_APPROVAL: 'ORG-APPROVAL-PENDING',
  ORG_COMPLETE: 'ORG-COMPLETE',
  ORG_REJECTED: 'ORG-REJECTED',
} as const;

export const ignoredPathnameRedirectSet = new Set<string>([
  '/callback/dev',
  '/callback/org',
  '/callback/dev/magic-login',
  '/callback/org/magic-login',
  '/callback/[userType]/magic-login',
]);
