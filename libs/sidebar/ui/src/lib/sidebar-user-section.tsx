import { PERMISSIONS } from '@jobstash/auth/core';

import { useAuthContext, useHasPermission } from '@jobstash/auth/state';
import { ProfileInfoProvider } from '@jobstash/profile/state';

import SidebarAdminSection from './sidebar-admin-section';
import SidebarDevSection from './sidebar-dev-section';
import SidebarOrgSection from './sidebar-org-section';
import { SidebarSectionSkeleton } from './sidebar-section';

interface Props {
  isMobile?: boolean;
}

const SidebarUserSection = ({ isMobile }: Props) => {
  const { isAuthenticated, isLoading } = useAuthContext();

  const isAdmin = useHasPermission(PERMISSIONS.ADMIN);

  if (isLoading) return <SidebarSectionSkeleton />;
  if (!isAuthenticated) return null;

  if (isAdmin) return <SidebarAdminSection />;

  return (
    <ProfileInfoProvider>
      <SidebarDevSection isMobile={isMobile} />
      <SidebarOrgSection isMobile={isMobile} />
    </ProfileInfoProvider>
  );
};

export default SidebarUserSection;
