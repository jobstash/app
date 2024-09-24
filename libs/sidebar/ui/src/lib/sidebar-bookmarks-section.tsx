import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';

import { BookmarkSidebarIcon } from '@jobstash/shared/ui';

import { SidebarSection } from './sidebar-section';

const bookmarkedBartabs = [
  {
    text: 'Saved Jobs',
    path: '/bookmarks/jobs',
    icon: <BookmarkSidebarIcon />,
  },
  // {
  //   text: 'Saved Orgs',
  //   path: '/bookmarks/organizations',
  //   icon: <BookmarkSidebarIcon />,
  //   isDisabled: true,
  // },
];

interface Props {
  isMobile?: boolean;
}

const SidebarBookmarksSection = ({ isMobile }: Props) => {
  const { role } = useAuthContext();

  const isDev = role === CHECK_WALLET_ROLES.DEV;

  if (!isDev) return null;

  return (
    <SidebarSection
      title="Bookmarks"
      isMobile={isMobile}
      bartabs={bookmarkedBartabs}
    />
  );
};

export default SidebarBookmarksSection;
