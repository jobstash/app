import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';
import { useAtom } from 'jotai';

import { useAllOrgs } from '@jobstash/admin/state';

import { selectedOrgAtom } from '../core/atoms';

import { ManageLayout } from './manage-page-layout';

export const OrgManagePage = () => {
  const { query } = useRouter();

  const { data, isLoading } = useAllOrgs();

  const [selectedOrg, setSelectedOrg] = useAtom(selectedOrgAtom);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isReady && !isLoading) {
      if (!selectedOrg && data) {
        const orgId = query.orgId as string;
        const org = data.find((org) => org.orgId === orgId);

        if (org) {
          setSelectedOrg({ ...org, value: org.name });
        }
      }

      setIsReady(true);
    }
  }, [data, isLoading, isReady, query.orgId, selectedOrg, setSelectedOrg]);

  if (isLoading || !isReady) return <LoadingPage />;
  if (!selectedOrg) return <NotFoundPage />;

  return (
    <ManageLayout>
      <pre>{JSON.stringify({ query, selectedOrg }, undefined, '\t')}</pre>
    </ManageLayout>
  );
};
