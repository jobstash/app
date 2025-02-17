import dynamic from 'next/dynamic';
import Head from 'next/head';

import { PageWrapper } from '@jobstash/shared/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const PreTalentsPage = () => (
  <>
    <Head>
      <title>Available Talents</title>
    </Head>

    <PageWrapper>
      <SideBar />
      <p>TODO</p>
    </PageWrapper>
  </>
);
