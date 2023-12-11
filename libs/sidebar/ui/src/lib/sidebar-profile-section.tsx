import { useProfileInfoContext } from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

import SidebarBartab from './sidebar-bartab';

const SidebarProfileSection = () => {
  const { profileInfoData } = useProfileInfoContext();

  return (
    <div className="flex-col">
      <Text color="dimmed">Your Profile</Text>
      <div className="space-y-3 pt-3">
        <SidebarBartab path="/profile" text="Profile" />

        {profileInfoData?.username && (
          <SidebarBartab
            path="/profile/repositories"
            text="Your Repositories"
          />
        )}

        <SidebarBartab path="/profile/reviews" text="Organization Reviews" />
      </div>
    </div>
  );
};

export default SidebarProfileSection;
