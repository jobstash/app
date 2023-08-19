import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useSidebarContext } from '@jobstash/sidebar/state';

import RequestToBeListedButton from './request-to-be-listed-button';
import SidebarProfileSection from './sidebar-profile-section';

const SidebarUserSection = () => {
  const { isSignedIn, role } = useSidebarContext();

  if (!isSignedIn) return <RequestToBeListedButton />;

  if (role === CHECK_WALLET_ROLES.DEV) return <SidebarProfileSection />;

  return null;
};

export default SidebarUserSection;
