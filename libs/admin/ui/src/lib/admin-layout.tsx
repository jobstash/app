import { ReactNode } from 'react';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { PERMISSIONS } from '@jobstash/auth/core';

import { useAuthContext, useHasPermission } from '@jobstash/auth/state';

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
  const { isLoading } = useAuthContext();
  const hasPermission = useHasPermission([
    PERMISSIONS.SUPER_ADMIN,
    PERMISSIONS.ADMIN,
  ]);

  if (isLoading) return <LoadingPage />;
  if (!hasPermission) return <NotFoundPage />;

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
