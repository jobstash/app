import { Tab, Tabs } from '@nextui-org/tabs';
import { useAtom } from 'jotai';

import { activeListAtom } from './active-list-atom';

export const ApplicantTabs = () => {
  const [activeList, setActiveList] = useAtom(activeListAtom);

  return (
    <div className="px-12 pt-4 pb-4">
      <Tabs
        aria-label="Applicant Tabs"
        variant="underlined"
        size="lg"
        selectedKey={activeList}
        onSelectionChange={(key) =>
          setActiveList(key as 'all' | 'shortlisted' | 'archived')
        }
      >
        <Tab key="all" title="All" />
        <Tab key="new" title="New" />
        <Tab key="shortlisted" title="Shortlisted" />
        <Tab key="archived" title="Archived" />
      </Tabs>
    </div>
  );
};
