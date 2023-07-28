import Head from 'next/head';
import { useRouter } from 'next/router';

import { LoadingPage } from '@jobstash/shared/pages';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';
import { useIsMounted } from '@jobstash/shared/state';

import { Button } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

interface Props {
  isOnboardSSR: boolean;
}

export const YourRepositoriesPage = ({ isOnboardSSR }: Props) => {
  const isMounted = useIsMounted();

  const { flow } = useAuthContext();

  const isOnboardFlow = flow === CHECK_WALLET_FLOWS.ONBOARD_REPO;
  const isOnboard = isOnboardSSR ?? isOnboardFlow;

  const { push } = useRouter();

  if (isMounted)
    return (
      <>
        <Head>
          <title>Add Github Account</title>
        </Head>
        <div className="w-full pl-52">
          <SideBar />

          <div>
            <p>{JSON.stringify({ isOnboard, isOnboardFlow, isOnboardSSR })}</p>
            <Button onClick={() => push('/add-github-account')}>
              CSR to add-github-account page
            </Button>
            <Button onClick={() => push('/pick-role')}>CSR to pick-role</Button>
          </div>
        </div>
      </>
    );

  return <LoadingPage />;
};
