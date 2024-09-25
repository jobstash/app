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
  const { role, isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) return <SidebarSectionSkeleton />;
  if (!isAuthenticated) return null;

  switch (role) {
    case CHECK_WALLET_ROLES.DEV: {
      return (
        <DevProfileInfoProvider>
          <SidebarDevSection isMobile={isMobile} />
        </DevProfileInfoProvider>
      );
    }

    case CHECK_WALLET_ROLES.ORG: {
      return <SidebarOrgSection isMobile={isMobile} />;
    }

    case CHECK_WALLET_ROLES.ADMIN: {
      return <SidebarAdminSection />;
    }

    default: {
      return null;
    }
  }
};

export default SidebarUserSection;
