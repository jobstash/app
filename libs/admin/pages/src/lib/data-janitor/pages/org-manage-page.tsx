import { useRouter } from 'next/router';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { ERR_NOT_FOUND } from '@jobstash/shared/core';

import { useOrgDetails } from '@jobstash/organizations/state';

import { InternalErrorResult } from '@jobstash/shared/ui';

import { CreateOrgSection } from '../components/create-org-section';
import { OrgInfo } from '../components/org-info';

import { ManageLayout } from './manage-page-layout';

export const OrgManagePage = () => {
  const { query } = useRouter();
  const { orgId } = query;

  const { data, error, isError, isLoading } = useOrgDetails(orgId as string);
  const isNotFound = error?.message === ERR_NOT_FOUND;

  if (typeof orgId !== 'string') return <NotFoundPage />;

  if (isLoading) return <LoadingPage />;

  if (isError && !isNotFound) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <InternalErrorResult />
      </div>
    );
  }

  if (!data || isNotFound) {
    return (
      <NotFoundPage
        message="The organization you are looking for does not exist."
        buttonText="Back to Search"
        link="/godmode/organizations/manage"
      />
    );
  }

  return (
    <ManageLayout>
      <div className="flex justify-between">
        <OrgInfo org={data} />
        <CreateOrgSection />
      </div>
    </ManageLayout>
  );
};
