import { Text } from '@jobstash/shared/ui';

import SidebarBartab from './sidebar-bartab';

const SidebarProfileSection = () => (
  <div className="flex-col">
    <Text color="dimmed">Your Profile</Text>
    <div className="space-y-3 pt-3">
      <div id="onboard-repo-1">
        <SidebarBartab path="/profile/repositories" text="Your Repositories" />
      </div>

      <div id="onboard-review-1">
        <SidebarBartab path="/profile/reviews" text="Organization Reviews" />
      </div>
    </div>
  </div>
);

export default SidebarProfileSection;
