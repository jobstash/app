import { Tab, Tabs } from '@nextui-org/react';

export const TalentTabs = () => {
  console.log('TODO');
  return (
    <div className="px-12 pt-4 pb-4">
      <Tabs
        aria-label="Applicant Tabs"
        variant="underlined"
        size="lg"
        selectedKey="all"
      >
        <Tab key="all" title="All" />
        <Tab key="new" isDisabled title="New" />
        <Tab key="shortlisted" isDisabled title="Shortlisted" />
        <Tab key="archived" isDisabled title="Archived" />
      </Tabs>
    </div>
  );
};
