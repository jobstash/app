import dynamic from 'next/dynamic';
import Head from 'next/head';

import { GradientBackground, PageWrapper } from '@jobstash/shared/ui';

import { AssistSection } from './assist-section';
import { AtsSection } from './ats-section';
import { BuildYourPackage } from './build-your-package';
import { SupportSection } from './support-section';
import { TalentPoolSection } from './talent-pool-section';
import { VeriSection } from './veri-section';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

interface Props {
  title: string;
}

export const PaywallPage = ({ title }: Props) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>

    <PageWrapper>
      <SideBar />
      <GradientBackground />

      <div className="flex flex-col gap-32 pt-10 pb-64">
        <BuildYourPackage />
        <AssistSection />
        <VeriSection />
        <TalentPoolSection />
        <AtsSection />
        <SupportSection />
      </div>
    </PageWrapper>
  </>
);
