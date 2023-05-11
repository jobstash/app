export const EVENT_SIWE_LOGIN = 'siwe-login';
export const EVENT_SIWE_LOGOUT = 'siwe-logout';

export const CHECK_WALLET_ROLES = {
  ANON: 'ANON',
  ADMIN: 'ADMIN',
  DEV: 'DEV',
  ORG: 'ORG',
} as const;

export const CHECK_WALLET_FLOWS = {
  LOGIN: 'LOGIN',
  PICK_ROLE: 'PICK-ROLE',
  ADD_GITHUB_REPO: 'ADD-GITHUB-REPO',
  ONBOARD_REPO: 'ONBOARD-REPO',
  ONBOARD_PROFILE: 'ONBOARD-PROFILE',
  SIGNUP_COMPLETE: 'SIGNUP-COMPLETE',
  ADMIN_SYNONYMS: 'SYNONYMS',
} as const;

export const CHECK_WALLET_ROUTE: Record<
  (typeof CHECK_WALLET_FLOWS)[keyof typeof CHECK_WALLET_FLOWS],
  string
> = {
  [CHECK_WALLET_FLOWS.LOGIN]: '/login',
  [CHECK_WALLET_FLOWS.PICK_ROLE]: '/pick-role',
  [CHECK_WALLET_FLOWS.ADD_GITHUB_REPO]: '/add-github-account',
  [CHECK_WALLET_FLOWS.ONBOARD_REPO]: '/user/my-repositories',
  [CHECK_WALLET_FLOWS.ONBOARD_PROFILE]: '/TODO',
  [CHECK_WALLET_FLOWS.SIGNUP_COMPLETE]: '/jobs',
  [CHECK_WALLET_FLOWS.ADMIN_SYNONYMS]: '/godmode/technologies/synonyms',
};
