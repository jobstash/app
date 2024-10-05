import Head from 'next/head';

import { PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { GradientBackground } from '../components/gradient-background';

import { BestPractices } from './best-practices';
import { CareerPageCriteria } from './career-page-criteria';
import { HeroSection } from './hero-section';
import { LastCtaSection } from './last-cta-section';
import { OrgCriteria } from './org-criteria';
import { ReachTopTalent } from './reach-top-talent';
import { Security } from './security';

export const PostJobPage = () => (
  <>
    <Head>
      <title>Post Your Job</title>
    </Head>
    <PageWrapper>
      <SideBar />
      <div className="relative isolate overflow-hidden bg-gray-900 pb-20 flex flex-col gap-32">
        <GradientBackground />
        <HeroSection />
        <ReachTopTalent />
        <BestPractices />
        <Security />
        <OrgCriteria />
        <CareerPageCriteria />
        <LastCtaSection />
      </div>
    </PageWrapper>
  </>
);
