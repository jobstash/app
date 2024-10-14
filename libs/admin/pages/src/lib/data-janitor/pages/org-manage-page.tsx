import { useRouter } from 'next/router';

import { NotFoundPage } from '@jobstash/shared/pages';

import { CreateOrgSection } from '../components/create-org-section';
import { OrgInfo } from '../components/org-info';

import { ManageLayout } from './manage-page-layout';

export const OrgManagePage = () => {
  const { query } = useRouter();
  const { orgId } = query;

  if (typeof orgId !== 'string') return <NotFoundPage />;

  return (
    <ManageLayout>
      <div className="flex justify-between">
        <OrgInfo id={orgId} />
        <CreateOrgSection />
      </div>
    </ManageLayout>
  );
};
