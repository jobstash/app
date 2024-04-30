import { ReactNode } from 'react';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { LoadingPage } from '@jobstash/shared/pages';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

import { NotFoundPage } from '@jobstash/shared/ui';

import AdminHeader from './admin-header';

interface Props {
  breadCrumbs: ReactNode;
  sidebar: ReactNode;
  tabsSection: ReactNode;
  children: ReactNode;
  hideHeader?: boolean;
}

const AdminLayout = ({
  breadCrumbs,
  sidebar,
  tabsSection,
  children,
  hideHeader,
}: Props) => {
  const { isLoading, role } = useAuthContext();
  if (isLoading) return <LoadingPage />;

  const isAdmin = role === CHECK_WALLET_ROLES.ADMIN;
  if (!isAdmin) return <NotFoundPage />;

  return (
    <div className="w-screen overflow-x-hidden lg:pl-52 lg:pt-[100px] z-20 relative">
      {sidebar}

      {!hideHeader && <AdminHeader />}

      <hr className="border-t border-white/10 w-full" />

      {(breadCrumbs || tabsSection) && (
        <div className="flex items-center justify-between">
          {breadCrumbs}
          {tabsSection}
        </div>
      )}

      <div className="flex w-full justify-center">{children}</div>
    </div>
  );
};

export default AdminLayout;
