import { Dispatch, SetStateAction } from 'react';

import { Spinner } from '@nextui-org/react';
import { Tab, Tabs } from '@nextui-org/tabs';

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

  const { data: allData } = useJobApplicants(orgId, 'all');
  const { data: newData } = useJobApplicants(orgId, 'new');
  const { data: shortlistedData } = useJobApplicants(orgId, 'shortlisted');
  const { data: archivedData } = useJobApplicants(orgId, 'archived');

  const isLoading = [allData, newData, shortlistedData, archivedData].includes(
    undefined,
  );

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
        <Tab key="all" title={getCountText('All', allData?.length)} />
        <Tab key="new" title={getCountText('New', newData?.length)} />
        <Tab
          key="shortlisted"
          title={getCountText('Shortlisted', shortlistedData?.length)}
        />
        <Tab
          key="archived"
          title={getCountText('Archived', archivedData?.length)}
        />
      </Tabs>
      {isLoading && <Spinner color="white" size="sm" />}
    </div>
  );
};

const getCountText = (prefix: string, count?: number) =>
  `${prefix}${typeof count === 'number' ? ` (${count})` : ''}`;
