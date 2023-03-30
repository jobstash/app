import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

import { CHECK_WALLET_ROLES, CHECK_WALLET_ROUTE } from '../core/constants';
import { CheckWalletFlow, CheckWalletRole } from '../core/types';
import { useWalletAuthContext } from '../hooks';
import EmptyPage from '../pages/empty-page';

interface Props {
  requiredRole: CheckWalletRole | CheckWalletRole[];
  requiredFlow?: CheckWalletFlow;
  children: ReactNode;
}

export const ProtectedLayout = ({
  requiredRole,
  requiredFlow,
  children,
}: Props) => {
  const { asPath, push, isReady } = useRouter();

  const { role, flow, isLoading } = useWalletAuthContext();

  const authorized =
    typeof requiredRole === 'string'
      ? role === requiredRole
      : requiredRole.includes(role);
  const flowOk = requiredFlow ? requiredFlow === flow : true;

  // // Check if can remove this
  // const isAdmin = role === CHECK_WALLET_ROLES.ADMIN;

  const ok = authorized && flowOk;
  useEffect(() => {
    if (isLoading || !isReady) return;

    // // Check if can remove this
    // if (isAdmin && !asPath.includes('godmode')) {
    //   push('/godmode/synonyms');
    //   return;
    // }

    if (!ok) {
      push(CHECK_WALLET_ROUTE[flow]);
    }
  }, [asPath, flow, isLoading, isReady, ok, push]);

  if (isLoading || !ok) return <EmptyPage isLoading />;

  return <div>{children}</div>;
};
