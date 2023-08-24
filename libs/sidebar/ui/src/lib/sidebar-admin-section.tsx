import { Text } from '@jobstash/shared/ui';

import SidebarBartab from './sidebar-bartab';

const PATH_PREFIX = '/godmode/technologies';

const SidebarAdminSection = () => (
  <div className="flex-col">
    <Text color="dimmed">Admin Tasks</Text>
    <div className="space-y-3 pt-3">
      <SidebarBartab
        path="/godmode/technologies/synonyms"
        text="Technologies"
        isActiveFn={(pathname) =>
          pathname.slice(0, PATH_PREFIX.length) === PATH_PREFIX
        }
      />
    </div>
  </div>
);

export default SidebarAdminSection;
