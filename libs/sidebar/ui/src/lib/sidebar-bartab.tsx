import { useRouter } from 'next/router';
import { memo, type ReactNode } from 'react';

import { useSetAtom } from 'jotai';

import { ROUTE_SECTION } from '@jobstash/shared/core';

import { activeJobAtom, activeJobBookmarkAtom } from '@jobstash/jobs/state';
import { activeOrgIdAtom } from '@jobstash/organizations/state';
import { activeProjectIdAtom } from '@jobstash/projects/state';
import { sidebarOpenAtom } from '@jobstash/sidebar/state';

import { Bartab } from '@jobstash/shared/ui';

interface Props {
  text: string;
  path: string;
  icon?: ReactNode;
  isMobile?: boolean;
  isDisabled?: boolean;
  isActiveFn?: (pathname: string) => boolean;
}

const SidebarBartab = ({
  text,
  path,
  icon,
  isMobile,
  isDisabled,
  isActiveFn,
}: Props) => {
  const { pathname, push } = useRouter();

  const isActive = isActiveFn ? isActiveFn(pathname) : pathname === path;

  const setSidebarOpen = useSetAtom(sidebarOpenAtom);
  const setActiveJob = useSetAtom(activeJobAtom);
  const setActiveOrgId = useSetAtom(activeOrgIdAtom);
  const setActiveProjectId = useSetAtom(activeProjectIdAtom);
  const setActiveJobBookmark = useSetAtom(activeJobBookmarkAtom);

  const onClick = () => {
    if (pathname !== path) {
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
    }

    if (isMobile) {
      setSidebarOpen((prev) => !prev);
    }

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
