import { Tab, Tabs } from '@nextui-org/tabs';

export const ApplicantTabs = () => (
  <div className="pt-8 pb-4">
    <Tabs aria-label="Applicant Tabs" variant="underlined" size="lg">
      <Tab key="all" title="All" />
      <Tab key="shortlisted" title="Shortlisted" />
      <Tab key="archived" title="Archived" />
    </Tabs>
  </div>
);
