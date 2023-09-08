import { Text } from '@jobstash/shared/ui';

import SidebarBartab from './sidebar-bartab';

const GODMODE_PATH_PREFIX = {
  TECHNOLOGIES: '/godmode/technologies',
  ORGANIZATIONS: '/godmode/organizations',
};

const SidebarAdminSection = () => (
  <div className="flex-col">
    <Text color="dimmed">Admin Tasks</Text>
    <div className="space-y-3 pt-3">
      <SidebarBartab
        path="/godmode/technologies/synonyms"
        text="Technologies"
        isActiveFn={(pathname) =>
          pathname.slice(0, GODMODE_PATH_PREFIX.TECHNOLOGIES.length) ===
          GODMODE_PATH_PREFIX.TECHNOLOGIES
        }
      />
      <SidebarBartab
        path="/godmode/organizations"
        text="Organizations"
        isActiveFn={(pathname) =>
          pathname.slice(0, GODMODE_PATH_PREFIX.TECHNOLOGIES.length) ===
          GODMODE_PATH_PREFIX.ORGANIZATIONS
        }
      />
    </div>
  </div>
);

export default SidebarAdminSection;
