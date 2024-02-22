import Head from 'next/head';
import { useRouter } from 'next/router';

import { LoadingPage } from '@jobstash/shared/pages';

import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

import { PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const ProfileOrgPendingPage = () => {
  const router = useRouter();
  const { isLoading, role, flow } = useAuthContext();
  const { canRender } = useDelayedAuthRender({ requireConnected: true });

  if (!canRender || isLoading) return <LoadingPage />;

  const isOrg = role === CHECK_WALLET_ROLES.ORG;
  const isPending = flow === CHECK_WALLET_FLOWS.ORG_APPROVAL;
  if (!isOrg || !isPending) {
    router.push('/');
  }

  return (
    <>
      <Head>
        <title>Pending Approval</title>
      </Head>
      <PageWrapper>
        <SideBar />

        <div className="flex items-center justify-center min-h-screen">
          <p>TODO</p>
        </div>
      </PageWrapper>
    </>
  );
};
