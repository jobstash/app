import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { GradientBackground, PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import { HeroSection } from './hero-section';
import { JobFeaturePricing } from './job-feature-pricing';
import { SupportSection } from './support';
import { VeriPricing } from './veri-pricing';
import { WygFeaturedJobs } from './wyg-featured-jobs';
import { WygVeri } from './wyg-veri';

export const FeaturesPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleHashChange = () => {
      if (router.asPath.includes('#')) {
        const id = router.asPath.split('#')[1];
        // eslint-disable-next-line unicorn/prefer-query-selector
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange(); // Handle initial page load
    router.events.on('hashChangeComplete', handleHashChange);

    return () => {
      router.events.off('hashChangeComplete', handleHashChange);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Employers</title>
      </Head>
      <PageWrapper>
        <SideBar />
        <div className="relative isolate overflow-hidden bg-gray-900 pb-20 flex flex-col gap-32 pt-10">
          <GradientBackground />
          <HeroSection />
          <JobFeaturePricing />
          <WygFeaturedJobs />
          <VeriPricing />
          <WygVeri />
          <SupportSection />
        </div>
      </PageWrapper>
    </>
  );
};
