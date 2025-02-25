import { Tab, Tabs } from '@heroui/tabs';
import { useAtom } from 'jotai';

import { capitalize } from '@jobstash/shared/utils';

import { activeTabAtom } from './atoms';

const tabs = ['all', 'pending', 'approved', 'rejected'];

export const OrgApprovalTabs = () => {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  return (
    <Tabs
      aria-label="Approval Status"
      size="lg"
      variant="underlined"
      classNames={{
        cursor: 'bg-gradient-to-l from-primary to-tertiary',
        tab: 'lg:min-w-[120px]',
        tabContent: 'group-data-[selected=true]:font-bold',
      }}
      selectedKey={activeTab}
      onSelectionChange={(key) =>
        setActiveTab(key as 'all' | 'pending' | 'approved' | 'rejected')
      }
    >
      {tabs.map((tab) => (
        <Tab key={tab} title={capitalize(tab)} />
      ))}
    </Tabs>
  );
};
