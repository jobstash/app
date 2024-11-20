import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { PERMISSIONS } from '@jobstash/auth/core';

import { useHasPermission } from '@jobstash/auth/state';

import { BookmarkSidebarIcon } from '@jobstash/shared/ui';

import { SidebarSection } from './sidebar-section';

const SAVED_JOBS_PATH = '/bookmarks/jobs';

interface Props {
  isMobile?: boolean;
}

const SidebarBookmarksSection = ({ isMobile }: Props) => {
  const router = useRouter();

  const hasIdParam = Boolean(router.query.id);
  const hasUserPermission = useHasPermission(PERMISSIONS.USER);
  const isAnonSavedJobs =
    router.pathname === SAVED_JOBS_PATH && !hasIdParam && !hasUserPermission;

  const bookmarkedBartabs = useMemo(() => {
    if (!router.isReady) return [];

    // On anon, path is custom bookmark path
    const path =
      !hasUserPermission && hasIdParam ? router.asPath : '/bookmarks/jobs';

    return [
      {
        text: 'Bookmarked Jobs',
        path,
        icon: <BookmarkSidebarIcon />,
      },
    ];
  }, [hasIdParam, hasUserPermission, router.asPath, router.isReady]);

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
