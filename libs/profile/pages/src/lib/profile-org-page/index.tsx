import Head from 'next/head';

import { PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { NoticeModal } from './notice-modal';

export const ProfileOrgPage = () => (
  <>
    <Head>
      <title>Org Profile</title>
    </Head>
    <PageWrapper>
      <SideBar />
      <div className="flex flex-col gap-3 lg:flex-row min-h-screen w-full">
        <div className="flex-1 flex flex-col gap-4">
          <p>TODO</p>
        </div>

        <div className="hidden lg:flex lg:flex-1" />

        <div className="hide-scrollbar flex items-center justify-center lg:fixed lg:h-screen overflow-y-auto p-4 transition-all inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10 ">
          <div className="flex flex-col gap-4">
            <p>ORG_COMPLETE - Org Account Card</p>
          </div>
        </div>
      </div>
      <NoticeModal />
    </PageWrapper>
  </>
);
