import { PERMISSIONS } from '@jobstash/auth/core';

import { useHasPermission } from '@jobstash/auth/state';

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
  const hasPermission = useHasPermission(PERMISSIONS.USER);

  if (!hasPermission) return null;

  return (
    <SidebarSection
      title="Bookmarks"
      isMobile={isMobile}
      bartabs={bookmarkedBartabs}
    />
  );
};

export default SidebarBookmarksSection;
