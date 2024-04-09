import { ReactNode } from 'react';

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
}: Props) => (
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

export default AdminLayout;
