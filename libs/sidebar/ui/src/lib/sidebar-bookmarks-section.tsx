import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { PERMISSIONS } from '@jobstash/auth/core';

import { useHasPermission } from '@jobstash/auth/state';

import { BookmarkSidebarIcon } from '@jobstash/shared/ui';

import { SidebarSection } from './sidebar-section';

interface Props {
  isMobile?: boolean;
}

const SidebarBookmarksSection = ({ isMobile }: Props) => {
  const router = useRouter();

  const hasParam = Boolean(router.query.slug);
  const hasUserPermission = useHasPermission(PERMISSIONS.USER);
  const isAnonSavedJobs = !hasParam && !hasUserPermission;

  const bookmarkedBartabs = useMemo(() => {
    if (!router.isReady) return [];

    // On anon, path is custom bookmark path
    const path =
      !hasUserPermission && hasParam ? router.asPath : '/bookmarks/jobs';

    return [
      {
        text: 'Bookmarked Jobs',
        path,
        icon: <BookmarkSidebarIcon />,
      },
    ];
  }, [hasParam, hasUserPermission, router.asPath, router.isReady]);

  if (!router.isReady || isAnonSavedJobs) return null;

  return (
    <SidebarSection
      title="Bookmarks"
      isMobile={isMobile}
      bartabs={bookmarkedBartabs}
    />
  );
};

export default SidebarBookmarksSection;
