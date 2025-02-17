import Head from 'next/head';

import { GradientBackground, PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { BestPractices } from './best-practices';
import { CareerPageCriteria } from './career-page-criteria';
import { GettingStartedWithJobStash } from './getting-started-with-jobstash';
import { HeroSection } from './hero-section';
import { LastCtaSection } from './last-cta-section';
import { OrgCriteria } from './org-criteria';
import { Security } from './security';

export const PostJobPage = () => (
  <>
    <Head>
      <title>Post Your Job on JobStash for Free</title>
    </Head>
    <PageWrapper>
      <SideBar />
      <div className="relative isolate overflow-hidden bg-gray-900 pb-20 flex flex-col gap-32">
        <GradientBackground />
        <HeroSection />
        <GettingStartedWithJobStash />
        <CareerPageCriteria />
        <BestPractices />
        <Security />
        <OrgCriteria />
        <LastCtaSection />
      </div>
    </PageWrapper>
  </>
);
