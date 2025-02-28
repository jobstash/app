import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';
import { useSetAtom } from 'jotai';

import { getUserOrgBySlug } from '@jobstash/auth/utils';

import { orgManageTabAtom } from '@jobstash/admin/state';
import {
  ORG_ADMIN_TABS,
  orgAdminActiveTabAtom,
} from '@jobstash/organizations/state';
import {
  useProfileAuthorizedOrgs,
  useProfileVerifiedOrgs,
} from '@jobstash/profile/state';

import { OrgAdminContent, OrgAdminTabs } from '@jobstash/organizations/ui';
import { IsMountedWrapper, PageWrapper } from '@jobstash/shared/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const OrgAdminPage = () => {
  const { query } = useRouter();
  const { data: orgs } = useProfileVerifiedOrgs();
  const { data: approvedAffiliations } = useProfileAuthorizedOrgs();

  // Reset atom on client-side navigation
  const setMainTab = useSetAtom(orgAdminActiveTabAtom);
  const setFormTab = useSetAtom(orgManageTabAtom);
  useLayoutEffect(() => {
    setMainTab(ORG_ADMIN_TABS.ORGANIZATION);
    setFormTab('details');
  }, [setMainTab, query.slug, setFormTab]);

  if (!orgs) return <LoadingPage />;

  const matchedOrg = getUserOrgBySlug(orgs, query.slug);
  const approvedOrgIds = approvedAffiliations?.map((org) => org.id) ?? [];
  const isApproved = matchedOrg && approvedOrgIds.includes(matchedOrg.id);

  if (!isApproved) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Head>{`Your Organization | ${matchedOrg.name}`}</Head>
      <PageWrapper>
        <SideBar />
        <IsMountedWrapper>
          <OrgAdminTabs />
        </IsMountedWrapper>
        <div className="pl-8 pt-32 lg:pt-0">
          <OrgAdminContent org={matchedOrg} />
        </div>
      </PageWrapper>
    </>
  );
};
