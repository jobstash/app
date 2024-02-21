import { ADMIN_PATHS, GODMODE_PATH_PREFIX } from '@jobstash/admin/core';

import { Text } from '@jobstash/shared/ui';

import SidebarBartab from './sidebar-bartab';

const SidebarAdminSection = () => (
  <div className="flex-col">
    <Text color="dimmed">Admin Tasks</Text>
    <div className="space-y-3 pt-3">
      <SidebarBartab path={ADMIN_PATHS.ORG_APPROVALS} text="Org Approvals" />
      <SidebarBartab
        path={ADMIN_PATHS.SYNONYMS}
        text="Tags"
        isActiveFn={(pathname) =>
          pathname.slice(0, GODMODE_PATH_PREFIX.TAGS.length) ===
          GODMODE_PATH_PREFIX.TAGS
        }
      />
      <SidebarBartab path={ADMIN_PATHS.ORG_LIST} text="Organizations" />
      <SidebarBartab
        path={ADMIN_PATHS.ALL_JOBS}
        text="All Jobs"
        isActiveFn={(pathname) =>
          pathname.slice(0, GODMODE_PATH_PREFIX.ALL_JOBS.length) ===
          GODMODE_PATH_PREFIX.ALL_JOBS
        }
      />
    </div>
  </div>
);

export default SidebarAdminSection;
