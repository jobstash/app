import Head from 'next/head';

import { PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { BestPractices } from './best-practices';
import { GradientBackground } from './gradient-background';
import { HeroSection } from './hero-section';
import { LastCtaSection } from './last-cta-section';
import { ReachTopTalent } from './reach-top-talent';

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
        <LastCtaSection />
      </div>
    </PageWrapper>
  </>
);
