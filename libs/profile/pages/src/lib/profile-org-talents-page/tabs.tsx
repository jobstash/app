import { Spinner } from '@nextui-org/spinner';
import { Tab, Tabs } from '@nextui-org/tabs';

export const TalentTabs = () => {
  // TODO: mw fetch talent list
  const isLoading = false;

  return (
    <div className="pt-8 flex items-center gap-2">
      <Tabs
        aria-label="Applicant Tabs"
        variant="underlined"
        size="lg"
        //
        // selectedKey={activeList}
        // onSelectionChange={(key) =>
        //   setActiveList(key as 'all' | 'shortlisted' | 'archived')
        // }
      >
        {/* <Tab key="all" title={getTableTabCountText('All', allData?.length)} />
        <Tab key="new" title={getTableTabCountText('New', newData?.length)} />
        <Tab
          key="shortlisted"
          title={getTableTabCountText('Shortlisted', shortlistedData?.length)}
        />
        <Tab
          key="archived"
          title={getTableTabCountText('Archived', archivedData?.length)}
        /> */}
        <Tab key="all" title="All" />
        <Tab key="new" title="New" />
        <Tab key="shortlisted" title="Shortlisted" />
        <Tab key="archived" title="Archived" />
      </Tabs>
      {isLoading && <Spinner color="white" size="sm" />}
    </div>
  );
};
