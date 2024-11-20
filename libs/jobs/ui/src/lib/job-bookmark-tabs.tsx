import { createPortal } from 'react-dom';

import { Tab, Tabs } from '@nextui-org/react';
import { useAtom } from 'jotai';

import { PORTAL_IDS } from '@jobstash/shared/core';

import {
  JOB_BOOKMARK_TABS,
  JobBookmarkTab,
  jobBookmarkTabsAtom,
} from '@jobstash/jobs/state';

export const JobBookmarkTabs = () => {
  const [activeTab, setActiveTab] = useAtom(jobBookmarkTabsAtom);

  // eslint-disable-next-line unicorn/prefer-query-selector
  const portal = document.getElementById(PORTAL_IDS.TOP_NAV_MAIN);
  if (!portal) return null;

  return createPortal(
    <Tabs
      aria-label="Approval Status"
      size="lg"
      variant="underlined"
      classNames={{
        cursor: 'bg-gradient-to-l from-primary to-tertiary',
        tabContent: 'text-white/80 group-data-[selected=true]:font-bold',
      }}
      selectedKey={activeTab}
      onSelectionChange={(key) => setActiveTab(key as JobBookmarkTab)}
    >
      {Object.values(JOB_BOOKMARK_TABS).map((tab) => (
        <Tab key={tab} title={tab} />
      ))}
    </Tabs>,
    portal,
  );
};
