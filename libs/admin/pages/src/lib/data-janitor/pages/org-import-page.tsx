import React from 'react';

import { Tab, Tabs } from '@nextui-org/react';
import { useAtom } from 'jotai';

import { OrgImportItems } from '../components/org-import-items';
import { OrgImportModal } from '../components/org-import-modal';
import { orgImportTabAtom } from '../core/atoms';
import { OrgImportStatus } from '../core/types';

import { ManageLayout } from './manage-page-layout';

export const OrgImportPage = () => {
  const [tab, setTab] = useAtom(orgImportTabAtom);
  const onSelectionChange = (key: React.Key) => {
    setTab(key as OrgImportStatus);
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
            <Tab key="all" title="All" />
            <Tab key="pending" title="Pending" />
            <Tab key="stale" title="Stale" />
            <Tab key="done" title="Done" />
          </Tabs>
        </div>

        <OrgImportItems />
      </div>
    </ManageLayout>
  );
};
