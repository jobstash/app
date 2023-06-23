import { memo } from 'react';

import { OrgPost } from '@jobstash/organizations/core';

import { useOrgList } from '@jobstash/organizations/state';

import { OrgCard, OrgListEmptyResult } from '@jobstash/organizations/ui';
import { Loader } from '@jobstash/shared/ui';

interface Props {
  initOrg: OrgPost | null;
  activeOrg: OrgPost | null;
}

const OrgList = ({ initOrg, activeOrg }: Props) => {
  const {
    push,
    isLoading,
    error,
    orgPosts,
    orgsPrevLink,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
    filterParamsObj,
  } = useOrgList(initOrg);

  if (isLoading) {
    return (
      <div className="py-4">
        {initOrg && (
          <OrgCard
            key={initOrg.id}
            isActive
            orgPost={initOrg}
            filterParamsObj={filterParamsObj}
          />
        )}
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (orgPosts.length === 0 && !error) {
    return (
      <div className="py-8">
        <OrgListEmptyResult prevLink={orgsPrevLink} push={push} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 py-4">
      {orgPosts.map((orgPost) => (
        <OrgCard
          key={orgPost.id}
          orgPost={orgPost}
          isActive={activeOrg?.id === orgPost.id}
          filterParamsObj={filterParamsObj}
        />
      ))}

      {orgPosts.length > 0 && (
        <div ref={inViewRef} className="flex items-center justify-center pb-10">
          {isFetchingNextPage && <Loader />}
          {!hasNextPage && <p>No more job posts to load</p>}
        </div>
      )}
      {(error as Error)?.message && (
        <div className="py-8">
          <p>error = {(error as Error).message}</p>
        </div>
      )}
    </div>
  );
};

export default memo(OrgList);
