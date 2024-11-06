import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { getUserOrgBySlug } from '@jobstash/auth/utils';

import { useAffiliatedOrgs } from '@jobstash/auth/state';
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
  const isDesktop = useIsDesktop();

  if (!isDesktop) return <MobileSupportPage />;
  if (!orgs) return <LoadingPage />;

  const matchedOrg = getUserOrgBySlug(orgs, query.slug);
  if (!matchedOrg) return <NotFoundPage />;

  return (
    <>
      <Head>{`Your Organization | ${matchedOrg.name}`}</Head>
      <PageWrapper>
        <SideBar />
        <IsMountedWrapper>
          <OrgAdminTabs />
        </IsMountedWrapper>
        <div className="relative pl-8">
          <OrgAdminContent org={matchedOrg} />
        </div>
      </PageWrapper>
    </>
  );
};
