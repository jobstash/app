import { Dispatch, SetStateAction } from 'react';

import { Spinner } from '@nextui-org/react';
import { Tab, Tabs } from '@nextui-org/tabs';

import { getTableTabCountText } from '@jobstash/profile/utils';

import { useJobApplicants } from '@jobstash/jobs/state';
import { useOrgProfileInfoContext } from '@jobstash/profile/state';

interface Props {
  activeList: 'all' | 'new' | 'shortlisted' | 'archived';
  setActiveList: Dispatch<
    SetStateAction<'all' | 'new' | 'shortlisted' | 'archived'>
  >;
}

export const ApplicantTabs = ({ activeList, setActiveList }: Props) => {
  const { profileInfoData } = useOrgProfileInfoContext();

  const orgId = profileInfoData?.orgId;

  const { data: allData, isRefetching: isRefetchingAll } = useJobApplicants(
    orgId,
    'all',
  );
  const { data: newData, isRefetching: isRefetchingNew } = useJobApplicants(
    orgId,
    'new',
  );
  const { data: shortlistedData, isRefetching: isRefetchingShortList } =
    useJobApplicants(orgId, 'shortlisted');
  const { data: archivedData, isRefetching: isRefetchingArchived } =
    useJobApplicants(orgId, 'archived');

  const isLoading =
    [allData, newData, shortlistedData, archivedData].includes(undefined) ||
    [
      isRefetchingAll,
      isRefetchingNew,
      isRefetchingShortList,
      isRefetchingArchived,
    ].includes(true);

  return (
    <div className="pt-8 flex items-center gap-2">
      <Tabs
        aria-label="Applicant Tabs"
        variant="underlined"
        size="lg"
        selectedKey={activeList}
        onSelectionChange={(key) =>
          setActiveList(key as 'all' | 'shortlisted' | 'archived')
        }
      >
        <Tab key="all" title={getTableTabCountText('All', allData?.length)} />
        <Tab key="new" title={getTableTabCountText('New', newData?.length)} />
        <Tab
          key="shortlisted"
          title={getTableTabCountText('Shortlisted', shortlistedData?.length)}
        />
        <Tab
          key="archived"
          title={getTableTabCountText('Archived', archivedData?.length)}
        />
      </Tabs>
      {isLoading && <Spinner color="white" size="sm" />}
    </div>
  );
};
