import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useTransition } from 'react';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';
import { useSetAtom } from 'jotai';

import { getUserOrgBySlug } from '@jobstash/auth/utils';

import { orgManageTabAtom } from '@jobstash/admin/state';
import { useAffiliatedOrgs } from '@jobstash/auth/state';
import {
  ORG_ADMIN_TABS,
  orgAdminActiveTabAtom,
} from '@jobstash/organizations/state';
import { useAffiliationRequests } from '@jobstash/profile/state';
import { useIsDesktop } from '@jobstash/shared/state';

import { OrgAdminContent, OrgAdminTabs } from '@jobstash/organizations/ui';
import {
  IsMountedWrapper,
  MobileSupportPage,
  PageWrapper,
} from '@jobstash/shared/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const OrgAdminPage = () => {
  const { query } = useRouter();
  const { data: orgs } = useAffiliatedOrgs();
  const { data: approvedAffiliations } = useAffiliationRequests({
    list: 'approved',
  });

  // Reset atom on client-side navigation
  const setMainTab = useSetAtom(orgAdminActiveTabAtom);
  const setFormTab = useSetAtom(orgManageTabAtom);
  useLayoutEffect(() => {
    setMainTab(ORG_ADMIN_TABS.ORGANIZATION);
    setFormTab('details');
  }, [setMainTab, query.slug, setFormTab]);

  const isDesktop = useIsDesktop();
  if (!isDesktop) return <MobileSupportPage />;

  if (!orgs) return <LoadingPage />;

  const matchedOrg = getUserOrgBySlug(orgs, query.slug);
  const approvedOrgIds = approvedAffiliations?.map((org) => org.orgId) ?? [];
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
        <div className="pl-8">
          <OrgAdminContent org={matchedOrg} />
        </div>
      </PageWrapper>
    </>
  );
};
