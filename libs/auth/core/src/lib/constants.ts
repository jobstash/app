import myzod from 'myzod';

export const EVENT_SIWE_LOGIN = 'siwe-login';
export const EVENT_SIWE_LOGOUT = 'siwe-logout';

export const CHECK_WALLET_ROLES = {
  ANON: 'ANON',
  ADMIN: 'ADMIN',
  DEV: 'DEV',
  ORG: 'ORG',
} as const;

export const checkWalletRolesSchema = myzod.literals(
  CHECK_WALLET_ROLES.ANON,
  CHECK_WALLET_ROLES.ADMIN,
  CHECK_WALLET_ROLES.DEV,
  CHECK_WALLET_ROLES.ORG,
);

export const CHECK_WALLET_FLOWS = {
  PICK_ROLE: 'PICK-ROLE',
  ADD_GITHUB_REPO: 'ADD-GITHUB-REPO',
  ONBOARD_REPO: 'ONBOARD-REPO',
  ONBOARD_PROFILE: 'ONBOARD-PROFILE',
  SIGNUP_COMPLETE: 'SIGNUP-COMPLETE',
  ADMIN_SYNONYMS: 'SYNONYMS',
} as const;

export const checkWalletFlowsSchema = myzod.literals(
  CHECK_WALLET_FLOWS.PICK_ROLE,
  CHECK_WALLET_FLOWS.ADD_GITHUB_REPO,
  CHECK_WALLET_FLOWS.ONBOARD_REPO,
  CHECK_WALLET_FLOWS.ONBOARD_PROFILE,
  CHECK_WALLET_FLOWS.SIGNUP_COMPLETE,
  CHECK_WALLET_FLOWS.ADMIN_SYNONYMS,
);

export const checkWalletDataSchema = myzod.object({
  role: checkWalletRolesSchema,
  flow: checkWalletFlowsSchema,
});

export const CHECK_WALLET_ROUTE: Record<
  typeof CHECK_WALLET_FLOWS[keyof typeof CHECK_WALLET_FLOWS],
  string
> = {
  [CHECK_WALLET_FLOWS.PICK_ROLE]: '/pick-role',
  [CHECK_WALLET_FLOWS.ADD_GITHUB_REPO]: '/add-github-account',
  [CHECK_WALLET_FLOWS.ONBOARD_REPO]: '/user/my-repositories',
  [CHECK_WALLET_FLOWS.ONBOARD_PROFILE]: '/TODO',
  [CHECK_WALLET_FLOWS.SIGNUP_COMPLETE]: '/jobs',
  [CHECK_WALLET_FLOWS.ADMIN_SYNONYMS]: '/godmode/technologies/synonyms',
};
