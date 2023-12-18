import Head from 'next/head';

import { LoadingPage } from '@jobstash/shared/pages';

import { ProfileInfoProvider } from '@jobstash/profile/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

import {
  AccountCard,
  ProfileDevInfo,
  ProfileGotItCard,
  ProfileHeader,
  ProfileSubHeader,
} from '@jobstash/profile/ui';
import { PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const ProfilePage = () => {
  const { canRender } = useDelayedAuthRender({ requireConnected: true });

  if (canRender) {
    return (
      <>
        <Head>Profile</Head>
        <ProfileInfoProvider>
          <PageWrapper>
            <SideBar />

            <div className="px-3.5 pt-[65px] lg:px-12 lg:pt-6 lg:pr-[50%] flex flex-col gap-6">
              <ProfileHeader />

              <ProfileSubHeader />

              <ProfileGotItCard />

              <ProfileDevInfo />
            </div>

            <div className="hide-scrollbar fixed h-screen overflow-y-auto p-4 transition-all inset-auto right-0 top-0 w-5/12 px-6 py-8 pr-10 flex items-center justify-center">
              <AccountCard />
            </div>
          </PageWrapper>
        </ProfileInfoProvider>
      </>
    );
  }

  return <LoadingPage />;
};
