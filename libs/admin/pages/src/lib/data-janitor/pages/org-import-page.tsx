import React from 'react';

import { Tab, Tabs } from '@nextui-org/react';
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
      <div className="flex flex-col gap-8 pt-8">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">Tracked Queued Imports</span>
          <OrgImportModal />
        </div>
        <div className="flex flex-col gap-8 max-w-lg rounded-2xl">
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
