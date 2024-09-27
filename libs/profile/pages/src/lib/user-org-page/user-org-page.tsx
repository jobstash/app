import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { NotFoundPage } from '@jobstash/shared/pages';

import { getUserOrgBySlug } from '@jobstash/auth/utils';

import { useAuthContext } from '@jobstash/auth/state';

import { PageWrapper } from '@jobstash/shared/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const UserOrgPage = () => {
  const { query, pathname, asPath } = useRouter();
  const { orgs } = useAuthContext();

  const matchedOrg = getUserOrgBySlug(orgs, query.slug);
  if (!matchedOrg) return <NotFoundPage />;

  return (
    <>
      <Head>{`Your Organization | ${matchedOrg.name}`}</Head>
      <PageWrapper>
        <SideBar />
        <pre>
          {JSON.stringify({ pathname, asPath, matchedOrg }, undefined, '\t')}
        </pre>
      </PageWrapper>
    </>
  );
};
