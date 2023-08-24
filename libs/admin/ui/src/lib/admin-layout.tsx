import { ReactNode } from 'react';

import AdminHeader from './admin-header';

interface Props {
  breadCrumbs: ReactNode;
  sidebar: ReactNode;
  tabsSection: ReactNode;
  children: ReactNode;
}

const AdminLayout = ({
  breadCrumbs,
  sidebar,
  tabsSection,
  children,
}: Props) => (
  <div className="w-full pl-64 flex flex-col gap-8 px-12">
    {sidebar}

    <AdminHeader />

    <hr className="border-t border-white/10 w-full" />

    <div className="flex items-center justify-between">
      {breadCrumbs}
      {tabsSection}
    </div>

    <div className="flex w-full justify-center">{children}</div>
  </div>
);

export default AdminLayout;
