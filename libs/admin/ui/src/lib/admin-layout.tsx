import { ReactNode } from 'react';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { CheckWalletPermission, PERMISSIONS } from '@jobstash/auth/core';

import { useAuthContext, useHasPermission } from '@jobstash/auth/state';

import AdminHeader from './admin-header';

interface Props {
  breadCrumbs: ReactNode;
  sidebar: ReactNode;
  tabsSection: ReactNode;
  children: ReactNode;
  hideHeader?: boolean;
  requiredPermissions?: CheckWalletPermission[];
}

const AdminLayout = ({
  breadCrumbs,
  sidebar,
  tabsSection,
  children,
  hideHeader,
  requiredPermissions = [PERMISSIONS.SUPER_ADMIN],
}: Props) => {
  const { isLoading } = useAuthContext();
  const hasPermission = useHasPermission(requiredPermissions);

  if (isLoading) return <LoadingPage />;
  if (!hasPermission) return <NotFoundPage />;

  return (
    <div className="w-screen px-4 pb-8 overflow-x-hidden lg:pl-60 lg:pr-8 lg:pt-[100px] z-20 relative xl:w-2/3">
      {sidebar}

      {!hideHeader && <AdminHeader />}

      {/* <hr className="w-full border-t border-white/10" /> */}

      {(breadCrumbs || tabsSection) && (
        <div className="-mb-10 -mr-4 md:mr-0">
          <div className='pb-2'>{breadCrumbs}</div>
          <div className='py-2 pr-4 overflow-auto'>{tabsSection}</div>
        </div>
      )}

      <div className="flex w-full pt-20 lg:pt-6">{children}</div>
    </div>
  );
};

export default AdminLayout;
