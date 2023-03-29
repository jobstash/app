import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

import { CHECK_WALLET_ROLES } from '../core/constants';
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

  const { role, flow, isLoading, isPageEmpty } = useWalletAuthContext();

  const authorized =
    typeof requiredRole === 'string'
      ? role === requiredRole
      : requiredRole.includes(role);
  const isAdmin = role === CHECK_WALLET_ROLES.ADMIN;
  const flowOk = asPath === '/login' || isAdmin ? true : requiredFlow === flow;

  useEffect(() => {
    if (isLoading || !isReady) return;

    if (isAdmin && !asPath.includes('godmode')) {
      push('/godmode/synonyms');
      return;
    }

    if (!authorized) {
      // If on login page, and not anon, just redirect to homepage (for now)
      push(asPath === '/login' ? '/' : '/login');
      return;
    }

    // We might want some pages to display only to certain flows
    // If it does not match, redirect to homepage (for now)
    if (!flowOk) {
      push('/login');
    }
  }, [asPath, authorized, flowOk, isAdmin, isLoading, isReady, push]);

  if (isLoading || !authorized || isPageEmpty || !flowOk)
    return <EmptyPage isLoading />;

  return <div>{children}</div>;
};
