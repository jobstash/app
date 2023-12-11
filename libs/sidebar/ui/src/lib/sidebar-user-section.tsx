import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { ProfileInfoProvider } from '@jobstash/profile/state';
import { useSidebarContext } from '@jobstash/sidebar/state';

import RequestToBeListedButton from './request-to-be-listed-button';
import SidebarAdminSection from './sidebar-admin-section';
import SidebarProfileSection from './sidebar-profile-section';

const SidebarUserSection = () => {
  const { isSignedIn, role } = useSidebarContext();

  if (!isSignedIn) return <RequestToBeListedButton />;

  switch (role) {
    case CHECK_WALLET_ROLES.DEV: {
      return (
        <ProfileInfoProvider>
          <SidebarProfileSection />
        </ProfileInfoProvider>
      );
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
