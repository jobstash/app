import { ADMIN_PATHS } from '@jobstash/admin/core';
import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';

import { SidebarBartabProps } from './sidebar-bartab';
import { SidebarSection } from './sidebar-section';
interface Props {
  isMobile?: boolean;
}

const SidebarAdminSection = ({ isMobile }: Props) => {
  const { role } = useAuthContext();

  const isAdmin = role === CHECK_WALLET_ROLES.ADMIN;
  const isDataEngineer = role === CHECK_WALLET_ROLES.DATA_JANITOR;

  if (!isAdmin && !isDataEngineer) {
    return null;
  }

  const tabs: SidebarBartabProps[] = [];

  if (isAdmin || isDataEngineer) {
    tabs.push({
      text: 'Manage Organizations',
      path: '/godmode/organizations/manage',
    });
  }

  if (isAdmin) {
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
