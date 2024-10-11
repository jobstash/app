import { CheckWalletPermission, PERMISSIONS } from '@jobstash/auth/core';

import { useAuthContext } from './use-auth-context';

export const useHasPermission = (
  whiteList: CheckWalletPermission[] | CheckWalletPermission,
) => {
  const { permissions } = useAuthContext();

  if (permissions.includes(PERMISSIONS.SUPER_ADMIN)) return true;

  if (Array.isArray(whiteList)) {
    return whiteList.some((permission) => permissions.includes(permission));
  }

  return permissions.includes(whiteList);
};
