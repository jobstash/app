import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { ProfileInfoProvider } from '@jobstash/profile/state';
import { useSidebarContext } from '@jobstash/sidebar/state';

import SidebarAdminSection from './sidebar-admin-section';
import SidebarDevSection from './sidebar-dev-section';
import SidebarOrgSection from './sidebar-org-section';

interface Props {
  isMobile?: boolean;
}

const SidebarUserSection = ({ isMobile }: Props) => {
  const { isSignedIn, role } = useSidebarContext();

  if (!isSignedIn) return null;

  switch (role) {
    case CHECK_WALLET_ROLES.DEV: {
      return (
        <ProfileInfoProvider>
          <SidebarDevSection isMobile={isMobile} />
        </ProfileInfoProvider>
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
