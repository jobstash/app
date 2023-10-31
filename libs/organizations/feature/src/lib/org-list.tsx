import { memo } from 'react';

import { type OrgListItem } from '@jobstash/organizations/core';

import { useOrgList } from '@jobstash/organizations/state';

import { OrgCard, OrgListEmptyResult } from '@jobstash/organizations/ui';
import { ListErrorMessage, Loader } from '@jobstash/shared/ui';

interface Props {
  initOrg: OrgListItem | null;
  activeOrgId: string | null;
}

const OrgList = ({ initOrg, activeOrgId }: Props) => {
  const {
    push,
    isLoading,
    error,
    orgListItems,
    orgsPrevLink,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
    filterParamsObj,
  } = useOrgList(initOrg);

  if (isLoading) {
    return (
      <div className="pb-4">
        {initOrg && (
          <OrgCard
            key={initOrg.orgId}
            isActive
            orgListItem={initOrg}
            filterParamsObj={filterParamsObj}
          />
        )}
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (orgListItems.length === 0 && !error) {
    return (
      <div className="py-8">
        <OrgListEmptyResult prevLink={orgsPrevLink} push={push} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 pb-4">
      {orgListItems.map((orgListItem) => (
        <OrgCard
          key={orgListItem.orgId}
          orgListItem={orgListItem}
          isActive={activeOrgId === orgListItem.orgId}
          filterParamsObj={filterParamsObj}
        />
      ))}

      {orgListItems.length > 0 && (
        <div ref={inViewRef} className="flex items-center justify-center pb-10">
          {isFetchingNextPage && <Loader />}
          {!hasNextPage && <p>No more organizations to load</p>}
        </div>
      )}

      {(error as Error)?.message && <ListErrorMessage error={error} />}
    </div>
  );
};

export default memo(OrgList);
