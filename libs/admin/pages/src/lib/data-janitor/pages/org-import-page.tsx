import React from 'react';

import { Tab, Tabs } from '@heroui/tabs';
import { useAtom } from 'jotai';

import { ImportStatus } from '@jobstash/admin/core';

import { orgImportTabAtom } from '@jobstash/admin/state';

import { OrgImportItems, OrgImportModal } from '@jobstash/admin/ui';

import { ManageLayout } from './manage-page-layout';

const tabs = [
  { key: 'all', title: 'All' },
  { key: 'pending', title: 'Pending' },
  { key: 'stale', title: 'Stale' },
  { key: 'done', title: 'Done' },
];

export const OrgImportPage = () => {
  const [tab, setTab] = useAtom(orgImportTabAtom);
  const onSelectionChange = (key: React.Key) => {
    setTab(key as ImportStatus);
  };

  return (
    <ManageLayout>
      <div className="flex flex-col gap-4 md:gap-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="order-2 md:order-1">
            <span className="text-2xl font-bold">Tracked Queued Imports</span>
          </div>
          <div className="order-1 md:order-2">
            <OrgImportModal />
          </div>
        </div>

        <div className="flex flex-col max-w-lg gap-8 rounded-2xl md:-mt-4">
          <span className="text-md text-white/90">
            Track the progress of your pending imports. Once the AI finishes
            processing, you&#39;ll be able to manage the organization details
            directly.
          </span>

          <Tabs
            aria-label="Import Groups"
            variant="underlined"
            size="lg"
            selectedKey={tab}
            onSelectionChange={onSelectionChange}
          >
            {tabs.map(({ key, title }) => (
              <Tab key={key} title={title} />
            ))}
          </Tabs>
        </div>

        <OrgImportItems />
      </div>
    </ManageLayout>
  );
};
