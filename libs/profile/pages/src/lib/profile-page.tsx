import Head from 'next/head';

import { LoadingPage } from '@jobstash/shared/pages';

import { ProfileInfoProvider } from '@jobstash/profile/state';
import { useDelayedAuthRender, useIsMobile } from '@jobstash/shared/state';

import {
  AccountCard,
  ProfileGotItCard,
  ProfileHeader,
  ProfileShowcaseSection,
  ProfileSkillsSection,
  ProfileSubHeader,
} from '@jobstash/profile/ui';
import { MobileSupportPage, PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const ProfilePage = () => {
  const { canRender } = useDelayedAuthRender({ requireConnected: true });

  const isMobile = useIsMobile();
  if (isMobile) return <MobileSupportPage />;

  if (canRender) {
    return (
      <>
        <Head>Profile</Head>
        <ProfileInfoProvider>
          <PageWrapper>
            <SideBar />

            <div className="px-3.5 pt-[65px] lg:px-12 lg:pt-6 lg:pr-[50%] flex flex-col gap-6 pb-40">
              <ProfileHeader />

              <ProfileSubHeader />

              <ProfileGotItCard />

              <ProfileShowcaseSection />

              <ProfileSkillsSection />
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
