import { Tab, Tabs } from '@nextui-org/react';
import { useAtom } from 'jotai';

import { ImportStatus } from '@jobstash/admin/core';

import { projectImportTabAtom } from '@jobstash/admin/state';

import { ProjectImportItems, ProjectImportModal } from '@jobstash/admin/ui';

import { ManageLayout } from './manage-page-layout';

//
const tabs = [
  { key: 'all', title: 'All' },
  { key: 'pending', title: 'Pending' },
  { key: 'stale', title: 'Stale' },
  { key: 'done', title: 'Done' },
];

export const ProjectImportPage = () => {
  const [tab, setTab] = useAtom(projectImportTabAtom);
  const onSelectionChange = (key: React.Key) => {
    setTab(key as ImportStatus);
  };

  return (
    <ManageLayout>
      <div className="flex flex-col gap-4 md:gap-8 pt-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="order-2 md:order-1">
            <span className="text-2xl font-bold">Tracked Queued Imports</span>
          </div>
          <div className="order-1 md:order-2">
            <ProjectImportModal />
          </div>
        </div>
        <div className="flex flex-col gap-8 max-w-lg rounded-2xl md:-mt-4">
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

        <ProjectImportItems />
      </div>
    </ManageLayout>
  );
};
