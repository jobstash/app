import Head from 'next/head';

import { DUCK_TELEGRAM_URL, lato } from '@jobstash/shared/core';

import { GradientContainer, HomePageButton } from '@jobstash/home/ui';
import { PageWrapper } from '@jobstash/shared/ui';
import { StatsGrid } from '@jobstash/shared/ui';
import { PrivyButton } from '@jobstash/auth/feature';
import { SideBar } from '@jobstash/sidebar/feature';

interface ServiceItemProps {
  title: string;
  description: string;
  cta: { text: string; url: string };
}

const SERVICES: ServiceItemProps[] = [
  {
    title: 'Job Featuring',
    description:
      'Get 5x more applicants when you feature your jobs on JobStash. Learn how JobStash works and about the impact and performance of JobStash.',
    cta: {
      text: 'JobStash Overview Deck',
      url: 'https://drive.google.com/file/d/1yuVMUrqBe6EgdB76ZVusSt5AWM_QaYxo/preview',
    },
  },
  {
    title: 'Veri',
    description:
      'Veri is a set of data tools to save time while hiring talent in the crypto space. It helps you identify genuine, crypto-native and upcoming talent, at scale, by relying on verifiable data instead of on CVs. Veri is designed to help you hire safer, better, and more efficiently.',
    cta: {
      text: 'Veri Overview Deck',
      url: 'https://drive.google.com/file/d/1VVoyR3vy9xrzy8hwzPUzxOAMvRQLZEQb/preview',
    },
  },
];

interface PricingItemProps {
  title: string;
  subtitle: string;
  price: string;
  unit?: string;
  features: string[];
  cta?: {
    text: string;
    url: string;
  };
}

const VERI_PRICES: PricingItemProps[] = [
  {
    title: 'Essential',
    subtitle: 'JobStash ATS',
    price: '99',
    features: [
      '✅ Access to our ATS',
      '✅ Track all your applicants',
      '✅ Access our Talent Pool',
      '✅ Applicants use 1-click apply',
      '✅ Keep your hiring ops in one place',
      '✅ Organization wide license',
      'Soon: Embeddable apply button & job board',
      'Soon: Post jobs to your TG & Discord',
    ],
  },
  {
    title: 'Advanced',
    subtitle: 'JobStash ATS + Veri Data',
    price: '199',
    features: [
      '✅ Access to our ATS',
      '✅ Track all your applicants',
      '✅ Access our Talent Pool + Veri Data',
      '✅ Applicants use 1-click apply',
      '✅ Keep your hiring ops in one place',
      '✅ Due Diligence data for candidates',
      '✅ Organization wide license',
      'Soon: Embeddable apply button & job board',
      'Soon: Post jobs to your TG & Discord',
    ],
  },
  {
    title: 'Pro',
    subtitle: 'ATS Integration + Veri Data',
    price: '99',
    features: [
      '✅ Integrated into any ATS',
      '✅ Automatically receive due diligence data on all your applicants directly in your ATS',
      "✅ Candidate Report, an in depth analysis of the candidate's data",
      '✅ Due Diligence data for 3000 applicants/mo',
      '✅ 1 Seat license',
      'Soon: Post jobs to your TG & Discord',
    ],
  },
];

const FEATUREING_PRICES: PricingItemProps[] = [
  {
    title: 'Flamboyant',
    subtitle: 'Job Featuring',
    price: '200',
    unit: 'job',
    features: [
      '✅ 1 job featured for 7 days',
      '✅ 2x the applicants',
      '✅ Featured on our homepage',
    ],
  },
  {
    title: 'Neon',
    subtitle: 'Job Featuring',
    price: '300',
    unit: 'job',
    features: [
      '✅ 1 job featured for 7 days',
      '✅ 5x the applicants',
      '✅ Featured on our homepage',
      '✅ Telegram stories about org, project and job',
      '✅ Job Post bumping on Telegram',
      '✅ Crossposting',
    ],
  },
];

const ServiceItem = ({
  title,
  description,
  cta: { text, url },
}: ServiceItemProps) => (
  <div className="w-full mb-4 md:px-2 md:w-1/2">
    <div className="flex flex-wrap justify-start h-full p-5 bg-white md:flex-col bg-opacity-5 rounded-3xl">
      <h3
        className={`${lato.className} justify-center text-3xl pb-3 font-bold text-white`}
      >
        {title}
      </h3>
      <p className="pb-6 text-left text-md text-white/75 grow">{description}</p>
      <div className="flex justify-center w-full">
        <HomePageButton hasBorder text={text} url={url} external={false} />
      </div>
    </div>
  </div>
);

const GradientCtaSection = ({
  title,
  description,
  cta,
}: {
  title: string;
  description: string;
  cta: React.ReactNode;
}) => (
  <section className="max-w-6xl pb-6 mx-auto md:pb-14">
    <GradientContainer className="mt-16">
      <div className="flex flex-col gap-2 text-white grow">
        <span className={`${lato.className} text-2xl font-bold`}>{title}</span>
        <span className="text-md text-white/90">{description}</span>
      </div>
      {cta}
    </GradientContainer>
  </section>
);

const PricingItem = ({
  title,
  subtitle,
  price,
  unit = 'mo',
  features,
  cta = { text: 'Get Started', url: DUCK_TELEGRAM_URL },
}: PricingItemProps) => (
  <div className="z-30 flex flex-col bg-white border rounded-md bg-opacity-5 border-primary">
    <div className="p-6 border-b border-default">
      <h3
        className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}
      >
        {title}
      </h3>
      <p className="text-center text-md text-subtle">{subtitle}</p>
      <h3
        className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}
      >
        ${price} <span className="text-lg">/ {unit}</span>
      </h3>
    </div>
    <ul className="flex-grow p-6 space-y-2">
      {features.map((feature) => (
        <li key={feature}>{feature}</li>
      ))}
    </ul>
    <div className="flex justify-center w-full px-6 pb-6">
      <HomePageButton hasBorder text={cta.text} url={cta.url} />
    </div>
  </div>
);

const OrganizationsPage = () => (
  <>
    <Head>
      <title>JobStash | Organizations</title>
    </Head>
    <PageWrapper>
      <SideBar />
      <div className="px-6 py-16 md:py-12 md:px-10">
        <section>
          <h3
            className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-4 md:pb-8`}
          >
            Hiring for Crypto Natives?
          </h3>
          <p className="text-white opacity-75 max-w-[640px] mx-auto text-lg text-center">
            Learn about our performance and ways we can improve impact on your
            job listings, as well as our ATS and Due Diligence services.
          </p>
        </section>

        <GradientCtaSection
          title="Maximize Your Reach on JobStash"
          description="Reach thousands of qualified candidates by posting your job openings on JobStash today."
          cta={
            <HomePageButton
              hasBorder
              text="Start Hiring Now"
              url="https://forms.gle/HWP6bUf3CB8RyJnw5"
            />
          }
        />

        <section className="pb-6 md:pb-14">
          <h3
            className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-4 md:pb-8`}
          >
            Our Stats
          </h3>
          <div className="max-w-6xl mx-auto">
            <StatsGrid />
          </div>
        </section>
        <section className="mx-auto">
          <div>
            <h3
              className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center`}
            >
              Services
            </h3>
            <div className="mx-auto mt-6 lg:max-w-6xl">
              <div className="flex flex-row flex-wrap md:-mx-2">
                {SERVICES.map((service) => (
                  <ServiceItem key={service.title} {...service} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <GradientCtaSection
          title="Exclusive Data Services"
          description="Sign up now to take advantage of JobStash’s data-driven recruitment solutions."
          cta={<PrivyButton isOrg text="Org Sign Up" />}
        />

        <section className="pb-6 md:pb-14">
          <h3
            className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-4 md:pb-8`}
          >
            Veri Prices
          </h3>
          <div className="mx-auto">
            <div className="grid grid-cols-1 gap-4 mx-auto mb-4 place-content-center lg:grid-cols-3 xl:w-4/5">
              {VERI_PRICES.map((pricing) => (
                <PricingItem key={pricing.title} {...pricing} />
              ))}
            </div>
          </div>
        </section>

        <section className="pb-6 md:pb-14">
          <h3
            className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-4 md:pb-8`}
          >
            Featuring Prices
          </h3>
          <div className="mx-auto">
            <div className="grid grid-cols-1 gap-4 mx-auto mb-4 place-content-center lg:grid-cols-2 lg:w-2/3 xl:grid-cols-2 xl:w-1/2">
              {FEATUREING_PRICES.map((pricing) => (
                <PricingItem key={pricing.title} {...pricing} />
              ))}
            </div>
          </div>
        </section>

        <GradientCtaSection
          title="Need help?"
          description={
            "We're here to help you with any questions you might have."
          }
          cta={
            <HomePageButton
              hasBorder
              text="Slide into our DMs"
              url={DUCK_TELEGRAM_URL}
            />
          }
        />
      </div>
    </PageWrapper>
  </>
);

export default OrganizationsPage;
