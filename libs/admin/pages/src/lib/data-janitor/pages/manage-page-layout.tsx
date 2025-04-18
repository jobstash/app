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
      <div className="p-4 pt-20 space-y-8 text-white md:p-8">
        {children}
      </div>
    </PageWrapper>
  );
};
