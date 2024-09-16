import { ADMIN_PATHS } from '@jobstash/admin/core';
import { cn } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

import SidebarBartab from './sidebar-bartab';
interface Props {
  isMobile?: boolean;
}
const SidebarAdminSection = ({ isMobile }: Props) => {
  const wrapperClassName = cn('space-y-2 pt-3', {
    'flex flex-col justify-start items-start [&>*]:bg-transparent [&>*]:bg-none [&>*]:hover:bg-transparent':
      isMobile,
  });
  return (
    <div className={wrapperClassName}>
      <Text color="dimmed">Admin Tasks</Text>
      <div className="space-y-3 pt-3">
        <SidebarBartab
          isMobile={isMobile}
          path={ADMIN_PATHS.ORG_APPROVALS}
          text="Org Approvals"
        />
        <SidebarBartab
          path={ADMIN_PATHS.SYNONYMS}
          text="Tags"
          isMobile={isMobile}
        />
        <SidebarBartab
          isExactPath
          isMobile={isMobile}
          path={ADMIN_PATHS.ORG_LIST}
          text="Organizations"
        />
        <SidebarBartab
          isMobile={isMobile}
          path={ADMIN_PATHS.ALL_JOBS}
          text="All Jobs"
        />
      </div>
    </div>
  );
};

export default SidebarAdminSection;
