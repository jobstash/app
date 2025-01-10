import { Tab, Tabs } from '@nextui-org/react';
import { useAtom } from 'jotai';

import { EDIT_ACTIVE_TABS, EditActiveTab, editActiveTabAtom } from './atoms';

export const EditModalTabs = () => {
  const [activeTab, setActiveTab] = useAtom(editActiveTabAtom);

  return (
    <Tabs
      fullWidth
      size="lg"
      variant="underlined"
      classNames={{
        base: 'pt-4',
        cursor: 'bg-gradient-to-l from-primary to-tertiary',
        tab: 'lg:min-w-[120px]',
        tabContent: 'text-white/80 group-data-[selected=true]:font-bold',
      }}
      selectedKey={activeTab}
      onSelectionChange={(key) => setActiveTab(key as EditActiveTab)}
    >
      {Object.values(EDIT_ACTIVE_TABS).map((tab) => (
        <Tab key={tab} title={tab} />
      ))}
    </Tabs>
  );
};
