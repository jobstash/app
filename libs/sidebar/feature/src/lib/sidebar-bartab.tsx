import { useRouter } from 'next/router';
import { memo, type ReactNode, useCallback, useMemo } from 'react';

import { useSetAtom } from 'jotai';

import { LIST_PATHS } from '@jobstash/shared/core';

import { activeJobAtom } from '@jobstash/jobs/state';
import { activeOrgIdAtom } from '@jobstash/organizations/state';
import { sidebarOpenAtom } from '@jobstash/sidebar/state';

import { Bartab } from '@jobstash/shared/ui';

interface Props {
  text: string;
  path: string;
  icon: ReactNode;
  isMobile?: boolean;
}

const SidebarBartab = ({ text, path, icon, isMobile }: Props) => {
  const { pathname, push } = useRouter();

  const isActive = useMemo(
    () => pathname.slice(0, path.length) === path,
    [path, pathname],
  );

  const setSidebarOpen = useSetAtom(sidebarOpenAtom);
  const setActiveJob = useSetAtom(activeJobAtom);
  const setActiveOrgId = useSetAtom(activeOrgIdAtom);

  const onClick = useCallback(() => {
    if (pathname !== path) {
      if (path === LIST_PATHS.jobs) {
        setActiveJob(null);
      }

      if (path === LIST_PATHS.organizations) {
        setActiveOrgId(null);
      }
    }

    if (isMobile) {
      setSidebarOpen((prev) => !prev);
    }

    push(path, undefined, { shallow: false, scroll: true });
  }, [
    isMobile,
    path,
    pathname,
    push,
    setActiveJob,
    setActiveOrgId,
    setSidebarOpen,
  ]);

  return (
    <Bartab isActive={isActive} left={isMobile ? null : icon} onClick={onClick}>
      {isMobile ? <span className="text-2xl text-white">{text}</span> : text}
    </Bartab>
  );
};

export default memo(SidebarBartab);
