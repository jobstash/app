import { CheckWalletFlow } from './types';

export const EVENT_SIWE_LOGIN = 'siwe-login';
export const EVENT_SIWE_LOGOUT = 'siwe-logout';

export const CHECK_WALLET_ROLES = {
  DEFAULT: 'ANON',
  ADMIN: 'ADMIN',
  DEV: 'DEV',
  ORG: 'ORG',
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
  ORG_APPROVAL: 'ORG-APPROVAL',
  ORG_COMPLETE: 'ORG-COMPLETE',
  ORG_REJECTED: 'ORG-REJECTED',
} as const;

export const CHECK_WALLET_ROUTE: Record<
  typeof CHECK_WALLET_FLOWS[keyof typeof CHECK_WALLET_FLOWS],
  string
> = {
  [CHECK_WALLET_FLOWS.DEFAULT]: '/',
  [CHECK_WALLET_FLOWS.PICK_ROLE]: '/pick-role',
  [CHECK_WALLET_FLOWS.ADD_GITHUB_REPO]: '/add-github-account',
  [CHECK_WALLET_FLOWS.ONBOARD_PROFILE]: '/profile',
  [CHECK_WALLET_FLOWS.ONBOARD_REPO]: '/profile/repositories',
  [CHECK_WALLET_FLOWS.ONBOARD_REVIEWS]: '/profile/reviews',
  [CHECK_WALLET_FLOWS.SIGNUP_COMPLETE]: '/',
  [CHECK_WALLET_FLOWS.ADMIN_SYNONYMS]: '/godmode/tags/synonyms',
  [CHECK_WALLET_FLOWS.ADMIN_COMPLETE]: '/godmode/tags/synonyms',
  [CHECK_WALLET_FLOWS.ORG_APPROVAL]: '/profile',
  [CHECK_WALLET_FLOWS.ORG_REJECTED]: '/profile',
  [CHECK_WALLET_FLOWS.ORG_COMPLETE]: '/profile',
};

export const redirectFlowsSet = new Set<CheckWalletFlow>([
  CHECK_WALLET_FLOWS.PICK_ROLE,
  CHECK_WALLET_FLOWS.ORG_APPROVAL,
  CHECK_WALLET_FLOWS.ORG_REJECTED,
]);

export const ignoredPathnameRedirectSet = new Set<string>([
  '/callback/[userType]/magic-login',
]);
