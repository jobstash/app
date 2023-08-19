import { ROUTE_SECTION } from '@jobstash/shared/core';

import { OrgSidebarIcon, ProjectsSidebarIcon } from '@jobstash/shared/ui';

import JobsSidebarIcon from './jobs-sidebar-icon';
import SidebarBartab from './sidebar-bartab';

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

const SidebarDiscoverBartabs = ({ isMobile }: Props) => {
  const wrapperClassName = isMobile
    ? 'flex flex-col justify-start items-start space-y-3 pt-3 [&>*]:bg-transparent [&>*]:bg-none [&>*]:hover:bg-transparent'
    : 'space-y-3 pt-3';

  return (
    <div className={wrapperClassName}>
      {discoverBartabs.map(({ text, path, icon }) => (
        <SidebarBartab
          key={path}
          isMobile={isMobile}
          path={path}
          icon={icon}
          text={text}
        />
      ))}
    </div>
  );
};

export default SidebarDiscoverBartabs;
