import dynamic from 'next/dynamic';
import React from 'react';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';
import { usePrivy } from '@privy-io/react-auth';

import { CHECK_WALLET_ROLES, CheckWalletRole } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';

import { PageWrapper } from '@jobstash/shared/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

interface Props {
  children: React.ReactNode;
}

const ALLOWED_ROLES = new Set<CheckWalletRole>([
  CHECK_WALLET_ROLES.ADMIN,
  CHECK_WALLET_ROLES.DATA_JANITOR,
]);

export const ManageLayout = ({ children }: Props) => {
  const { role, isLoading } = useAuthContext();
  const { ready } = usePrivy();

  if (isLoading || !ready) return <LoadingPage />;
  if (!ALLOWED_ROLES.has(role)) return <NotFoundPage />;

  return (
    <PageWrapper>
      <SideBar />
      <div className="p-8 space-y-8 h-screen text-white">{children}</div>
    </PageWrapper>
  );
};
