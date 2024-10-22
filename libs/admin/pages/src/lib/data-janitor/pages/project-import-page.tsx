import { Tab, Tabs } from '@nextui-org/react';
import { useAtom } from 'jotai';

import { ProjectImportItems } from '../components/project-import-items';
import { ProjectImportModal } from '../components/project-import-modal';
import { projectImportTabAtom } from '../core/atoms';
import { ImportStatus } from '../core/types';

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
      <div className="flex flex-col gap-8 pt-8">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">Tracked Queued Imports</span>
          <ProjectImportModal />
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

        <ProjectImportItems />
      </div>
    </ManageLayout>
  );
};
