import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { LoadingPage } from '@jobstash/shared/pages';

import {
  ProfileShowcaseProvider,
  ProfileSkillsProvider,
  useProfileInfo,
} from '@jobstash/profile/state';

import {
  DevAccountCard,
  ProfileAccordion,
  ProfileGotItCard,
  ProfileHeader,
  ProfileShowcaseSection,
  ProfileSkillsSection,
} from '@jobstash/profile/ui';
import { PageWrapper } from '@jobstash/shared/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const ProfileDevPage = () => {
  const { profileInfoData } = useProfileInfo();
  const { isReady } = useRouter();

  if (!isReady) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>Dev Profile</title>
      </Head>
      {profileInfoData ? (
        <PageWrapper>
          <SideBar />
          <div className="flex flex-col w-full min-h-screen gap-12 xl:py-10 xl:px-10 xl:flex-row ">
            <div className="xl:basis-2/3 ">
              <div className="flex flex-col gap-6 px-5 pt-20 xl:px-0 xl:pt-0 @container">
                <ProfileHeader
                  gotItCard={<ProfileGotItCard />}
                  gotItCardKey="profile"
                />
                <ProfileAccordion
                  showcase={
                    <ProfileShowcaseProvider>
                      <ProfileShowcaseSection />
                    </ProfileShowcaseProvider>
                  }
                  skills={
                    <ProfileSkillsProvider>
                      <ProfileSkillsSection />
                    </ProfileSkillsProvider>
                  }
                />
              </div>
            </div>
            <div className="mx-3 xl:mx-0">
              <DevAccountCard />
            </div>
          </div>
        </PageWrapper>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};
