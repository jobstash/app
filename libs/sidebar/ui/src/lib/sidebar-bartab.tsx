import { useRouter } from 'next/router';
import { memo, type ReactNode } from 'react';

import { useSetAtom } from 'jotai';

import { ROUTE_SECTION } from '@jobstash/shared/core';

import { activeJobAtom, activeJobBookmarkAtom } from '@jobstash/jobs/state';
import { activeOrgIdAtom } from '@jobstash/organizations/state';
import { activeProfileRepoAtom } from '@jobstash/profile/state';
import { activeProjectIdAtom } from '@jobstash/projects/state';
import { isOpenFullscreenNavAtom } from '@jobstash/shared/state';

import { Bartab } from '@jobstash/shared/ui';

export interface SidebarBartabProps {
  text: string;
  path: string;
  icon?: ReactNode;
  isMobile?: boolean;
  isDisabled?: boolean;
  isExactPath?: boolean;
}

const SidebarBartab = ({
  text,
  path,
  isExactPath,
  icon,
  isMobile,
  isDisabled,
}: SidebarBartabProps) => {
  const { asPath, push } = useRouter();

  const isActive = isExactPath
    ? asPath === path
    : asPath === path || asPath.startsWith(`${path}/`);

  const setIsOpenNav = useSetAtom(isOpenFullscreenNavAtom);
  const setActiveJob = useSetAtom(activeJobAtom);
  const setActiveOrgId = useSetAtom(activeOrgIdAtom);
  const setActiveProjectId = useSetAtom(activeProjectIdAtom);
  const setActiveJobBookmark = useSetAtom(activeJobBookmarkAtom);
  const setActiveProfileRepo = useSetAtom(activeProfileRepoAtom);

  const onClick = () => {
    if (asPath !== path) {
      if (path === ROUTE_SECTION.JOBS) {
        setActiveJob(null);
      }

      if (path === ROUTE_SECTION.ORGANIZATIONS) {
        setActiveOrgId(null);
      }

      if (path === ROUTE_SECTION.PROJECTS) {
        setActiveProjectId(null);
      }

      if (path === ROUTE_SECTION.JOB_BOOKMARKS) {
        setActiveJobBookmark(null);
      }

      if (path === ROUTE_SECTION.PROFILE_REPO) {
        setActiveProfileRepo(null);
      }
    }

    setIsOpenNav(false);

    push(path, undefined, { shallow: false, scroll: true });
  };

  return (
    <Bartab
      isActive={isActive}
      left={isMobile ? null : icon}
      isDisabled={isDisabled}
      onClick={onClick}
    >
      {isMobile ? <span className="text-2xl text-white">{text}</span> : text}
    </Bartab>
  );
};

export default memo(SidebarBartab);
