import { createPortal } from 'react-dom';

import { Tab, Tabs } from '@nextui-org/react';
import { useAtom } from 'jotai';

import { PORTAL_IDS } from '@jobstash/shared/core';

import {
  ORG_ADMIN_TABS,
  OrgAdminActiveTab,
  orgAdminActiveTabAtom,
} from '@jobstash/organizations/state';

export const OrgAdminTabs = () => {
  const [activeTab, setActiveTab] = useAtom(orgAdminActiveTabAtom);

  // eslint-disable-next-line unicorn/prefer-query-selector
  const portal = document.getElementById(PORTAL_IDS.TOP_NAV_MAIN);
  if (!portal) return null;

  return createPortal(
    <div className="py-4">
      <Tabs
        aria-label="Approval Status"
        size="lg"
        variant="underlined"
        classNames={{
          cursor: 'bg-gradient-to-l from-primary to-tertiary',
          tab: 'lg:min-w-[120px]',
          tabContent: 'text-white/80 group-data-[selected=true]:font-bold',
        }}
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as OrgAdminActiveTab)}
      >
        {Object.values(ORG_ADMIN_TABS).map((tab) => (
          <Tab key={tab} title={tab} />
        ))}
      </Tabs>
    </div>,
    portal,
  );
};
