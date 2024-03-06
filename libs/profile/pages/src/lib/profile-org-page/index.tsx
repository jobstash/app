import Head from 'next/head';

import { LoadingPage } from '@jobstash/shared/pages';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';
import { useOrgProfileInfo } from '@jobstash/profile/state';

import { OrgAccountCard } from '@jobstash/profile/ui';
import { PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { ProfileOrgForm } from './form';
import { NoticeModal } from './notice-modal';

export const ProfileOrgPage = () => {
  const { flow } = useAuthContext();
  const { profileInfoData } = useOrgProfileInfo();

  return (
    <>
      <Head>
        <title>
          {flow === CHECK_WALLET_FLOWS.ORG_PROFILE
            ? 'Setup Profile'
            : 'Org Profile'}
        </title>
      </Head>
      {profileInfoData ? (
        <PageWrapper>
          <SideBar />
          <div className="flex flex-col gap-3 lg:flex-row min-h-screen w-full">
            <div className="flex-1 flex lg:pl-10 lg:pt-10">
              <ProfileOrgForm />
            </div>

            <div className="hidden lg:flex lg:flex-1" />

            <div className="hide-scrollbar flex items-center justify-center lg:fixed lg:h-screen overflow-y-auto p-4 transition-all inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10">
              <div className="flex flex-col gap-4">
                <OrgAccountCard />
              </div>
            </div>
          </div>
          <NoticeModal />
        </PageWrapper>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};
