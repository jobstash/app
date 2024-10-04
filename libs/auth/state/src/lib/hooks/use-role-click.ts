import { type CheckWalletRole } from '@jobstash/auth/core';

import { useAuthContext } from './use-auth-context';

interface Props {
  role: CheckWalletRole | CheckWalletRole[];
  callback: () => void;
}

export const useRoleClick = ({ role, callback }: Props) => {
  const { role: currentRole, showLoginModal } = useAuthContext();
  const isAuthd = Array.isArray(role)
    ? role.includes(currentRole)
    : currentRole === role;

  return {
    isAuthd,
    roleClick: isAuthd ? callback : showLoginModal,
  };
};
