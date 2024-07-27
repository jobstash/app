import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { cn } from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';

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

  const wrapperClassName = cn('space-y-2 pt-3', {
    'flex flex-col justify-start items-start [&>*]:bg-transparent [&>*]:bg-none [&>*]:hover:bg-transparent':
      isMobile,
  });

  return (
    <IsMountedWrapper>
      <div className="flex-col">
        <Text color="dimmed">Bookmarked</Text>
        <div className={wrapperClassName}>
          {bookmarkedBartabs.map(({ text, path, icon }) => (
            <SidebarBartab
              key={path}
              isMobile={isMobile}
              path={path}
              icon={icon}
              text={text}
            />
          ))}
        </div>
      </div>
    </IsMountedWrapper>
  );
};

export default SidebarBookmarksSection;
