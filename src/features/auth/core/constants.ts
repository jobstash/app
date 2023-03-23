export const EVENT_SIWE_LOGIN = 'siwe-login';
export const EVENT_SIWE_LOGOUT = 'siwe-logout';

export const CHECK_WALLET_ROLES = {
  ANON: 'anon',
  ADMIN: 'admin',
  DEV: 'dev',
  ORG: 'org',
} as const;

export const CHECK_WALLET_FLOWS = {
  LOGIN: 'login',
  PICK_ROLE: 'pick-role',
  SIGNUP_COMPLETE: 'signup-complete',
  ONBOARD_REPO: 'onboard-repo',
  ONBOARD_PROFILE: 'onboard-profile',
  ADMIN_SYNONYMS: 'synonyms',
} as const;

export const CHECK_WALLET_ROUTE: Record<
  (typeof CHECK_WALLET_FLOWS)[keyof typeof CHECK_WALLET_FLOWS],
  string
> = {
  [CHECK_WALLET_FLOWS.LOGIN]: '/login',
  [CHECK_WALLET_FLOWS.PICK_ROLE]: '/pick-role',
  [CHECK_WALLET_FLOWS.SIGNUP_COMPLETE]: '/add-github-account',
  [CHECK_WALLET_FLOWS.ONBOARD_REPO]: '/TODO',
  [CHECK_WALLET_FLOWS.ONBOARD_PROFILE]: '/TODO',
  [CHECK_WALLET_FLOWS.ADMIN_SYNONYMS]: '/godmode/synonyms',
};
