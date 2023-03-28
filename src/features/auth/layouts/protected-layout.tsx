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

  useEffect(() => {
    if (isLoading || !isReady) return;

    if (role === CHECK_WALLET_ROLES.ADMIN && asPath !== '/godmode/synonyms') {
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
    if (requiredFlow && requiredFlow !== flow) {
      push('/');
    }
  }, [asPath, authorized, flow, isLoading, isReady, push, requiredFlow, role]);

  if (isLoading || !authorized || isPageEmpty) return <EmptyPage isLoading />;

  return <div>{children}</div>;
};
