import { useSidebarContext } from '@jobstash/sidebar/state';

import {
  BookmarkSidebarIcon,
  IsMountedWrapper,
  Text,
} from '@jobstash/shared/ui';

import SidebarBartab from './sidebar-bartab';

const bookmarkedBartabs = [
  {
    text: 'Saved Jobs',
    path: '/bookmarks/jobs',
    icon: <BookmarkSidebarIcon />,
  },
  {
    text: 'Saved Orgs',
    path: '/bookmarks/organizations',
    icon: <BookmarkSidebarIcon />,
    isDisabled: true,
  },
];

const SidebarBookmarksSection = () => {
  const { isSignedIn } = useSidebarContext();

  if (!isSignedIn) return null;

  return (
    <IsMountedWrapper>
      <div className="flex-col">
        <Text color="dimmed">Bookmarked</Text>
        <div className="space-y-3 pt-3">
          {bookmarkedBartabs.map(({ text, path, icon, isDisabled }) => (
            <SidebarBartab
              key={path}
              path={path}
              icon={icon}
              text={text}
              isDisabled={isDisabled}
            />
          ))}
        </div>
      </div>
    </IsMountedWrapper>
  );
};

export default SidebarBookmarksSection;
