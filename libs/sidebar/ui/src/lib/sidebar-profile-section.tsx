import { Text } from '@jobstash/shared/ui';

import SidebarBartab from './sidebar-bartab';

const PROFILE_BARTABS = [
  {
    id: 'onboard-profile-1',
    path: '/profile',
    text: 'Profile',
  },
  {
    id: 'onboard-repo-1',
    path: '/profile/repositories',
    text: 'Your Repositories',
  },
  {
    id: 'onboard-review-1',
    path: '/profile/reviews',
    text: 'Organization Reviews',
  },
];

const SidebarProfileSection = () => (
  <div className="flex-col">
    <Text color="dimmed">Your Profile</Text>
    <div className="space-y-3 pt-3">
      {PROFILE_BARTABS.map(({ id, path, text }) => (
        <div key={id} id={id}>
          <SidebarBartab path={path} text={text} />
        </div>
      ))}
    </div>
  </div>
);

export default SidebarProfileSection;
