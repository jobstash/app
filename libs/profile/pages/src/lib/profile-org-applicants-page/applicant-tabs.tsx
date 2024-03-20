import { Dispatch, SetStateAction } from 'react';

import { Tab, Tabs } from '@nextui-org/tabs';

interface Props {
  activeList: 'all' | 'new' | 'shortlisted' | 'archived';
  setActiveList: Dispatch<
    SetStateAction<'all' | 'new' | 'shortlisted' | 'archived'>
  >;
}

export const ApplicantTabs = ({ activeList, setActiveList }: Props) => (
  <div className="pt-8 pb-4">
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
