import { useSetAtom } from 'jotai';

import { type CheckWalletRole } from '@jobstash/auth/core';

import { bypassDevSignupAtom } from '../atoms/bypass-dev-signup-atom';

import { useAuthContext } from './use-auth-context';

interface Props {
  role: CheckWalletRole | CheckWalletRole[];
  bypassDevSignup?: boolean;
  callback: () => void;
}

export const useRoleClick = ({
  role,
  callback,
  bypassDevSignup = false,
}: Props) => {
  const { role: currentRole, showLoginModal } = useAuthContext();
  const isAuthd = Array.isArray(role)
    ? role.includes(currentRole)
    : currentRole === role;

  const setBypassDevSignup = useSetAtom(bypassDevSignupAtom);
  if (bypassDevSignup) {
    setBypassDevSignup(true);
  }

  return {
    isAuthd,
    roleClick: isAuthd ? callback : showLoginModal,
  };
};
