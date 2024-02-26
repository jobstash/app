import Head from 'next/head';

import { PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const ProfileOrgPage = () => (
  <>
    <Head>
      <title>Org Profile</title>
    </Head>
    <PageWrapper>
      <SideBar />

      <div className="flex items-center justify-center min-h-screen p-2">
        <p>TODO</p>
      </div>
    </PageWrapper>
  </>
);
