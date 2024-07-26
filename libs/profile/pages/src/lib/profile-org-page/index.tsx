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
          <div className="flex flex-col w-full gap-12 px-4 py-20 xl:flex-row xl:min-h-screen xl:px-10 xl:py-10">
              <div className='xl:basis-2/3'>
                <ProfileOrgForm />
              </div>
              <div className='flex justify-center w-full xl:self-start xl:mt-0 xl:justify-center xl:basis-1/3'>
                <OrgAccountCard />
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
