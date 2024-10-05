import Head from 'next/head';

import { PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { GradientBackground } from '../components/gradient-background';

import { HeroSection } from './hero-section';
import { JobFeaturePricing } from './job-feature-pricing';
import { StatsSection } from './stats-section';
import { SupportSection } from './support';
import { VeriPricing } from './veri-pricing';
import { WygFeaturedJobs } from './wyg-featured-jobs';
import { WygVeri } from './wyg-veri';

export const EmployersPage = () => (
  <>
    <Head>
      <title>Employers</title>
    </Head>
    <PageWrapper>
      <SideBar />
      <div className="relative isolate overflow-hidden bg-gray-900 pb-20 flex flex-col gap-32 pt-10">
        <GradientBackground />
        <HeroSection />
        <StatsSection />
        <JobFeaturePricing />
        <WygFeaturedJobs />
        <VeriPricing />
        <WygVeri />
        <SupportSection />
      </div>
    </PageWrapper>
  </>
);
