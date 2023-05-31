import { memo, useEffect } from 'react';

import { useAtomValue } from 'jotai';

import { sidebarOpenAtom } from '@jobstash/sidebar/state';

import { CloseIcon, HamburgerIcon, Text } from '@jobstash/shared/ui';
import {
  Brand,
  JobsBartab,
  JobsBartabMobile,
  JobsSidebarIcon,
  MobileMenuButton,
  MobileNavbarWrapper,
  SidebarCloseButton,
  SidebarWrapper,
} from '@jobstash/sidebar/ui';

const Sidebar = () => {
  const sidebarOpen = useAtomValue(sidebarOpenAtom);

  useEffect(() => {
    const el = document.querySelectorAll('html')[0];
    if (sidebarOpen) {
      el.classList.add('disable-scroll');
    } else {
      el.classList.remove('disable-scroll');
    }
  }, [sidebarOpen]);

  return (
    <SidebarWrapper sidebarOpen={sidebarOpen}>
      <Brand />

      <MobileNavbarWrapper>
        <div className="flex justify-between">
          <Brand />
          <SidebarCloseButton>
            <CloseIcon />
          </SidebarCloseButton>
        </div>
        <Text color="dimmed" className="block pt-8">
          Discover
        </Text>

        <div className="inline-flex space-y-3 pt-3 [&>*]:bg-transparent [&>*]:bg-none [&>*]:hover:bg-transparent">
          <JobsBartabMobile />
        </div>
      </MobileNavbarWrapper>

      <div className="-mr-2 ml-auto self-center lg:hidden">
        <MobileMenuButton>
          <HamburgerIcon />
        </MobileMenuButton>
      </div>

      <div className="mt-12 hidden lg:block">
        <Text color="dimmed">Discover</Text>
        <div className="space-y-3 pt-3">
          <JobsBartab icon={<JobsSidebarIcon />}>Jobs</JobsBartab>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default memo(Sidebar);
