import { useModal } from 'connectkit';

import { type CheckWalletRole } from '@jobstash/auth/core';

import { useAuthContext } from './use-auth-context';

export const useRoleClick = (role: CheckWalletRole, fn: () => void) => {
  const { setOpen } = useModal();
  const { role: currentRole } = useAuthContext();

  const isAuthd = currentRole === role;

  return {
    isAuthd,
    roleClick: () => (isAuthd ? fn() : setOpen(true)),
  };
};
