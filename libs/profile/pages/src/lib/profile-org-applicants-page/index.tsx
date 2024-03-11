import Head from 'next/head';

import { OrgProfileInfoProvider } from '@jobstash/profile/state';

import { PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { ApplicantsTable } from './table';

export const ProfileOrgApplicantsPage = () => (
  <>
    <Head>
      <title>Job Applicants</title>
    </Head>
    <OrgProfileInfoProvider>
      <PageWrapper>
        <SideBar />

        <ApplicantsTable />
      </PageWrapper>
    </OrgProfileInfoProvider>
  </>
);
