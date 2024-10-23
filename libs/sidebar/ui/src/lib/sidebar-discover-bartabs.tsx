import { ROUTE_SECTION } from '@jobstash/shared/core';

import { OrgSidebarIcon, ProjectsSidebarIcon } from '@jobstash/shared/ui';

import JobsSidebarIcon from './jobs-sidebar-icon';
import { SidebarSection } from './sidebar-section';

const discoverBartabs = [
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

interface Props {
  isMobile?: boolean;
}

const SidebarDiscoverBartabs = ({ isMobile }: Props) => (
  <SidebarSection
    title="Discover"
    isMobile={isMobile}
    bartabs={discoverBartabs}
  />
);

export default SidebarDiscoverBartabs;
