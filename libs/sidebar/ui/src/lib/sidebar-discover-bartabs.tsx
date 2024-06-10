import { ROUTE_SECTION } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { OrgSidebarIcon, ProjectsSidebarIcon } from '@jobstash/shared/ui';

import JobsSidebarIcon from './jobs-sidebar-icon';
import SidebarBartab from './sidebar-bartab';

const discoverBartabs = [
  { text: 'Jobs', path: ROUTE_SECTION.JOBS, icon: <JobsSidebarIcon /> },
  {
    text: 'Crypto Native Jobs',
    path: ROUTE_SECTION.CRYPTO_NATIVE_JOBS,
    icon: <JobsSidebarIcon />,
  },
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
  const wrapperClassName = cn('space-y-2 pt-3', {
    'flex flex-col justify-start items-start [&>*]:bg-transparent [&>*]:bg-none [&>*]:hover:bg-transparent':
      isMobile,
  });

  return (
    <div className={wrapperClassName}>
      {discoverBartabs.map(({ text, path, icon }) => (
        <SidebarBartab
          key={path}
          isMobile={isMobile}
          path={path}
          icon={icon}
          text={text}
          isActiveFn={(pathname) => {
            const pathLength = path.length;
            const pathString =
              pathname.length > pathLength
                ? pathname.slice(0, pathLength)
                : pathname;
            return pathString === path;
          }}
        />
      ))}
    </div>
  );
};

export default SidebarDiscoverBartabs;
