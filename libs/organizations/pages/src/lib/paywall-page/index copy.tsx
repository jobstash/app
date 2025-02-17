import dynamic from 'next/dynamic';
import Head from 'next/head';

import { GradientBackground, PageWrapper } from '@jobstash/shared/ui';

import { BuildYourPackage } from './build-your-package';
import { HeroSection } from './hero-section';
import { SupportSection } from './support-section';
const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const PreCandidateReportPage = () => (
  <>
    <Head>
      <title>Candidate Report</title>
    </Head>

    <PageWrapper>
      <SideBar />
      <GradientBackground />

      <div className="flex flex-col gap-32 pt-10 pb-20">
        <HeroSection />
        <BuildYourPackage />
        <SupportSection />
      </div>
    </PageWrapper>
  </>
);
