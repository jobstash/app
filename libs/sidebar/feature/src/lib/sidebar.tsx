import { memo, useEffect } from 'react';

import { useAtomValue } from 'jotai';

import { ROUTE_SECTION } from '@jobstash/shared/core';

import { sidebarOpenAtom } from '@jobstash/sidebar/state';

import {
  CloseIcon,
  HamburgerIcon,
  OrgSidebarIcon,
  ProjectsSidebarIcon,
  Text,
} from '@jobstash/shared/ui';
import {
  Brand,
  JobsSidebarIcon,
  MobileMenuButton,
  MobileNavbarWrapper,
  RequestToBeListedButton,
  SidebarCloseButton,
  SidebarWrapper,
} from '@jobstash/sidebar/ui';
import { ConnectWalletButton } from '@jobstash/auth/feature';

import SidebarBartab from './sidebar-bartab';

const sidebarBartabs = [
  { text: 'Jobs', path: ROUTE_SECTION.JOBS, icon: <JobsSidebarIcon /> },
  {
    text: 'Organizations',
    path: ROUTE_SECTION.ORGANIZATIONS,
    icon: <OrgSidebarIcon />,
  },
  {
    text: 'Projects',
    path: ROUTE_SECTION.PROJECTS,
    icon: <ProjectsSidebarIcon />,
  },
];

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

        <div className="flex flex-col justify-start items-start space-y-3 pt-3 [&>*]:bg-transparent [&>*]:bg-none [&>*]:hover:bg-transparent">
          {/* <JobsBartabMobile /> */}

          {sidebarBartabs.map(({ text, path, icon }) => (
            <SidebarBartab
              key={path}
              isMobile
              path={path}
              icon={icon}
              text={text}
            />
          ))}
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
          {/* <JobsBartab icon={<JobsSidebarIcon />}>Jobs</JobsBartab> */}
          {sidebarBartabs.map(({ text, path, icon }) => (
            <SidebarBartab key={path} path={path} icon={icon} text={text} />
          ))}
        </div>
      </div>

      <div className="inset-x-0 bottom-0 hidden space-y-4 p-4 lg:absolute lg:block">
        <RequestToBeListedButton />
        <hr className="border-t border-white/20" />
        <ConnectWalletButton />
      </div>
    </SidebarWrapper>
  );
};

export default memo(Sidebar);
