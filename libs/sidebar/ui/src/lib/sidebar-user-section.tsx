import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';
import { DevProfileInfoProvider } from '@jobstash/profile/state';

import SidebarAdminSection from './sidebar-admin-section';
import SidebarDevSection from './sidebar-dev-section';
import SidebarOrgSection from './sidebar-org-section';
import { SidebarSectionSkeleton } from './sidebar-section';

interface Props {
  isMobile?: boolean;
}

const SidebarUserSection = ({ isMobile }: Props) => {
  const { role, isAuthenticated, isLoading, orgs } = useAuthContext();

  if (isLoading) return <SidebarSectionSkeleton />;
  if (!isAuthenticated) return null;

  return (
    <>
      {role !== CHECK_WALLET_ROLES.ADMIN && (
        <DevProfileInfoProvider>
          <SidebarDevSection isMobile={isMobile} />
        </DevProfileInfoProvider>
      )}

      {orgs.length > 0 && <SidebarOrgSection isMobile={isMobile} />}

      {role === CHECK_WALLET_ROLES.ADMIN && <SidebarAdminSection />}
    </>
  );
};

export default SidebarUserSection;
