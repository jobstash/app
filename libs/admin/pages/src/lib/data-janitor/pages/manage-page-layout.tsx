import dynamic from 'next/dynamic';
import React from 'react';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';
import { usePrivy } from '@privy-io/react-auth';

import { PERMISSIONS } from '@jobstash/auth/core';

import { useAuthContext, useHasPermission } from '@jobstash/auth/state';

import { PageWrapper } from '@jobstash/shared/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

interface Props {
  children: React.ReactNode;
}

export const ManageLayout = ({ children }: Props) => {
  const { ready } = usePrivy();
  const { isLoading } = useAuthContext();

  const hasPermission = useHasPermission(PERMISSIONS.ADMIN);

  if (isLoading || !ready) return <LoadingPage />;
  if (!hasPermission) return <NotFoundPage />;

  return (
    <PageWrapper>
      <SideBar />
      <div className="pt-20 md:pt-32 xl:pt-2 p-4 md:p-8 space-y-8 h-screen text-white">
        {children}
      </div>
    </PageWrapper>
  );
};
