import { Tab, Tabs } from '@nextui-org/react';
import { useAtom } from 'jotai';

import {
  ORG_ADMIN_TABS,
  OrgAdminActiveTab,
  orgAdminActiveTabAtom,
} from '@jobstash/organizations/state';

export const OrgAdminTabs = () => {
  const [activeTab, setActiveTab] = useAtom(orgAdminActiveTabAtom);

  return (
    <div className="py-4">
      <Tabs
        aria-label="Approval Status"
        size="lg"
        variant="underlined"
        classNames={{
          cursor: 'bg-gradient-to-l from-primary to-tertiary',
          tab: 'min-w-[120px]',
          tabContent: 'text-white/80 group-data-[selected=true]:font-bold',
        }}
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as OrgAdminActiveTab)}
      >
        {Object.values(ORG_ADMIN_TABS).map((tab) => (
          <Tab key={tab} title={tab} />
        ))}
      </Tabs>
    </div>
  );
};
