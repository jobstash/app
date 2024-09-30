import { useDevProfileInfoContext } from '@jobstash/profile/state';

import { SidebarSection } from './sidebar-section';

interface Props {
  isMobile?: boolean;
}

const SidebarDevSection = ({ isMobile }: Props) => {
  const { profileInfoData } = useDevProfileInfoContext();

  const tabs = [
    { text: 'Profile', path: '/profile', isExactPath: true },
    ...(profileInfoData?.linkedAccounts?.github
      ? [{ text: 'Your Repositories', path: '/profile/repositories' }]
      : []),
    // { text: 'Organization Reviews', path: '/profile/reviews' },
  ];

  return (
    <SidebarSection
      isMountedWrapped
      title="Your Profile"
      isMobile={isMobile}
      bartabs={tabs}
    />
  );
};

export default SidebarDevSection;
