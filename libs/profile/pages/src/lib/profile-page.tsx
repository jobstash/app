import Head from 'next/head';

import { LoadingPage } from '@jobstash/shared/pages';

import { ProfileInfoProvider } from '@jobstash/profile/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

import {
  AccountCard,
  ProfileGotItCard,
  ProfileHeader,
  ProfileShowcaseSection,
  ProfileSkillsSection,
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
            <div className="flex flex-col gap-3 lg:flex-row min-h-screen w-full">
              <div className="flex-1">
                <div className="px-3.5 pt-20 lg:px-12 lg:pt-6 flex flex-col gap-6 lg:pb-40">
                  <ProfileHeader />
                  <ProfileSubHeader />
                  <ProfileGotItCard />
                  <ProfileShowcaseSection />
                  <ProfileSkillsSection />
                </div>
              </div>

              <div className="hidden lg:flex lg:flex-1" />

              <div className="hide-scrollbar flex items-center justify-center lg:fixed lg:h-screen overflow-y-auto p-4 transition-all inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10 ">
                <AccountCard />
              </div>
            </div>
          </PageWrapper>
        </ProfileInfoProvider>
      </>
    );
  }

  return <LoadingPage />;
};
