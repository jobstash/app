import { ADMIN_PATHS } from '@jobstash/admin/core';
import { PERMISSIONS } from '@jobstash/auth/core';

import { useAuthContext, useHasPermission } from '@jobstash/auth/state';

import { SidebarBartabProps } from './sidebar-bartab';
import { SidebarSection } from './sidebar-section';
interface Props {
  isMobile?: boolean;
}

const SidebarAdminSection = ({ isMobile }: Props) => {
  const { permissions } = useAuthContext();

  const hasPermission = useHasPermission(PERMISSIONS.ADMIN);

  const isSuperAdmin = permissions.includes(PERMISSIONS.SUPER_ADMIN);

  if (!hasPermission) {
    return null;
  }

  const tabs: SidebarBartabProps[] = [];

  if (hasPermission) {
    tabs.push(
      {
        text: 'Import Organization',
        path: '/godmode/organizations/import',
      },
      {
        text: 'Manage Organizations',
        path: '/godmode/organizations/manage',
      },
      {
        text: 'Manage Projects',
        path: '/godmode/projects/manage',
      },
    );
  }

  if (isSuperAdmin) {
    tabs.push(
      { text: 'Org Approvals', path: ADMIN_PATHS.ORG_APPROVALS },
      { text: 'Tags', path: ADMIN_PATHS.SYNONYMS },
      { text: 'Organizations', path: ADMIN_PATHS.ORG_LIST, isExactPath: true },
      { text: 'All Jobs', path: ADMIN_PATHS.ALL_JOBS },
    );
  }

  return (
    <SidebarSection
      isMountedWrapped
      title="Admin Tasks"
      isMobile={isMobile}
      bartabs={tabs}
    />
  );
};

export default SidebarAdminSection;
