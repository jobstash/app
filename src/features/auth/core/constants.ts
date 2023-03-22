export const CHECK_WALLET_RESULT = {
  ADMIN: 'admin',
  PICK_ROLE: 'pick-role',
  SIGNUP_COMPLETE: 'signup-complete',
} as const;

export const CHECK_WALLET_ROUTE: Record<
  (typeof CHECK_WALLET_RESULT)[keyof typeof CHECK_WALLET_RESULT],
  string
> = {
  [CHECK_WALLET_RESULT.ADMIN]: '/godmode',
  [CHECK_WALLET_RESULT.PICK_ROLE]: '/pick-role',
  [CHECK_WALLET_RESULT.SIGNUP_COMPLETE]: '/jobs',
};

export const EVENT_SIWE_LOGIN = 'siwe-login';
export const EVENT_SIWE_LOGOUT = 'siwe-logout';
