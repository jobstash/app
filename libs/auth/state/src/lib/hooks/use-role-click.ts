import { CheckWalletPermission } from '@jobstash/auth/core';

import { useAuthContext } from './use-auth-context';
import { useHasPermission } from './use-has-permission';

interface Props {
  allowed: CheckWalletPermission | CheckWalletPermission[];
  callback: () => void;
}

export const useRoleClick = ({ allowed, callback }: Props) => {
  const { showLoginModal } = useAuthContext();
  const hasPermission = useHasPermission(allowed);

  return {
    hasPermission,
    roleClick: hasPermission ? callback : showLoginModal,
  };
};
