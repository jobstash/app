import Head from 'next/head';

import { Button } from '@nextui-org/button';

import { DUCK_TELEGRAM_URL, lato } from '@jobstash/shared/core';

import { HomePageButton } from '@jobstash/home/ui';
import { PageWrapper } from '@jobstash/shared/ui';
import { StatsGrid } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';
import { GradientContainer } from 'libs/home/ui/src/lib/landing/sections/gradient-container';

const OrganizationsPage = () => (
  <>
    <Head>
      <title>JobStash | Organizations</title>
    </Head>
    <PageWrapper>
      <SideBar />
      <div className="px-6 py-16 md:py-12 md:px-10">
        <section className="pb-6 md:pb-14">
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
        <section className="pb-6 md:pb-14">
          <h3
            className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-4 md:pb-8`}
          >
            Our Stats
          </h3>
          <div className="mx-auto">
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
            <div className="flex flex-row flex-wrap mx-auto mt-6 lg:max-w-6xl">
              <div className="w-full px-2 mb-4 md:w-1/2">
                <div className="flex flex-wrap justify-start h-full p-5 bg-white bg-opacity-5 rounded-3xl">
                  <h3
                    className={`${lato.className} justify-center text-3xl pb-3 font-bold text-white`}
                  >
                    Job Featuring
                  </h3>
                  <p className="text-left text-md text-white/75 grow">
                    Get 5x more applicants when you feature your jobs on JobStash.
                    Learn about the impact and performance of JobStash.
                    Learn how it all works.
                  </p>
                  <HomePageButton
                    hasBorder
                    text="JobStash Overview Deck"
                    url="https://drive.google.com/file/d/1yuVMUrqBe6EgdB76ZVusSt5AWM_QaYxo/preview"
                    external={false}
                  />
                </div>
              </div>
              <div className="w-full px-2 mb-4 md:w-1/2">
                <div className="flex flex-wrap justify-start h-full p-5 bg-white bg-opacity-5 rounded-3xl">
                  <h3
                    className={`${lato.className} justify-center text-3xl pb-3 font-bold text-white`}
                  >
                    SAFU
                  </h3>
                  <p className="text-left text-md text-white/75 grow">
                    Safu is a productivity tool to save time while hiring talent in the
                    crypto space. It helps you identify genuine, crypto-native
                    and upcoming talent, at scale, by relying on
                    verifiable data instead of on CVs. Safu ATS is designed to help you hire
                    safer, better, and more efficiently.
                  </p>
                  <HomePageButton
                    hasBorder
                    text="SAFU Overview Deck"
                    url="https://drive.google.com/file/d/1VVoyR3vy9xrzy8hwzPUzxOAMvRQLZEQb/preview"
                    external={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pb-6 md:pb-14">
          <GradientContainer className="mt-16">
            <div className="flex flex-col gap-4 text-white grow">
              <span className={`${lato.className} text-xl font-bold`}>
                Need help?
              </span>
              <span className="text-md text-white/75">
                We're here to help you with any questions you might have.
              </span>
            </div>
            <HomePageButton
              hasBorder
              text="Slide into our DMs"
              url={DUCK_TELEGRAM_URL}
            />
          </GradientContainer>
        </section>
        <section className="pb-6 md:pb-14">
          <h3
            className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-4 md:pb-8`}
          >
            SAFU Prices
          </h3>
          <div className="mx-auto">
            <div className="grid grid-cols-1 gap-4 mb-4 place-content-center lg:grid-cols-3 xl:grid-cols-5">
              {/* Essential Plan */}
              <div className="z-30 flex flex-col bg-white border rounded-md bg-opacity-5 border-primary">
                <div className="p-6 border-b border-default">
                  <h3
                    className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}
                  >
                    Essential
                  </h3>
                  <p className="text-center text-md text-subtle">
                    JobStash ATS
                  </p>
                  <h3
                    className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}
                  >
                    $199 <span className="text-lg">/ mo</span>
                  </h3>
                </div>
                <ul className="flex-grow p-6 space-y-2">
                  <li>✅ Upgrade from Notion custom website</li>
                  <li>✅ Track all your applicants</li>
                  <li>✅ Applicants use 1-click apply</li>
                  <li>✅ Keep your hiring ops in one place</li>
                  <li>✅ Organization wide license</li>
                  <li>Soon: Embeddable apply button & job board</li>
                  <li>Soon: Post jobs to your TG & Discord</li>
                </ul>
                <div className="px-6 pb-6">
                  <HomePageButton
                    hasBorder
                    text="Get Started"
                    url={DUCK_TELEGRAM_URL}
                  />
                </div>
              </div>

              {/* Advanced Plan */}
              <div className="z-30 flex flex-col bg-white border rounded-md bg-opacity-5 border-primary">
                <div className="p-6 border-b border-default">
                  <h3
                    className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}
                  >
                    Advanced
                  </h3>
                  <p className="text-center text-md text-subtle">
                    JobStash ATS + Safu
                  </p>
                  <h3
                    className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}
                  >
                    $299 <span className="text-lg">/ mo</span>
                  </h3>
                </div>
                <ul className="flex-grow p-6 space-y-2">
                  <li>✅ The upgrade choice from Notion</li>
                  <li>✅ Track all your applicants</li>
                  <li>✅ Applicants use 1-click apply</li>
                  <li>✅ Keep your hiring ops in one place</li>
                  <li>✅ Due Diligence data for candidates</li>
                  <li>✅ Organization wide license</li>
                  <li>Soon: Embeddable apply button & job board</li>
                  <li>Soon: Post jobs to your TG & Discord</li>
                </ul>
                <div className="px-6 pb-6">
                  <HomePageButton
                    hasBorder
                    text="Get Started"
                    url={DUCK_TELEGRAM_URL}
                  />
                </div>
              </div>

              {/* Pro Plan */}
              <div className="z-30 flex flex-col bg-white border rounded-md bg-opacity-5 border-primary">
                <div className="p-6 border-b border-default">
                  <h3
                    className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}
                  >
                    Pro
                  </h3>
                  <p className="text-center text-md text-subtle">
                    ATS Integration + Safu
                  </p>
                  <h3
                    className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}
                  >
                    $499 <span className="text-lg">/ mo</span>
                  </h3>
                </div>
                <ul className="flex-grow p-6 space-y-2">
                  <li>✅ Integrated into any ATS</li>
                  <li>
                    ✅ Automatically receive due diligence data on all your
                    applicants directly in your ATS
                  </li>
                  <li>
                    ✅ Candidate Report, an in depth analysis of the
                    candidate&#39;s data
                  </li>
                  <li>✅ Due Diligence data for 3000 applicants/mo</li>
                  <li>✅ 1 Seat license</li>
                  <li>Soon: Post jobs to your TG & Discord</li>
                </ul>
                <div className="px-6 pb-6">
                  <HomePageButton
                    hasBorder
                    text="Get Started"
                    url={DUCK_TELEGRAM_URL}
                  />
                </div>
              </div>

              {/* Elite Plan */}
              <div className="z-30 flex flex-col bg-white border rounded-md bg-opacity-5 border-primary">
                <div className="p-6 border-b border-default">
                  <h3
                    className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}
                  >
                    Elite
                  </h3>
                  <p className="text-center text-md text-subtle">
                    ATS Integration + Safu
                  </p>
                  <h3
                    className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}
                  >
                    $999 <span className="text-lg">/ mo</span>
                  </h3>
                </div>
                <ul className="flex-grow p-6 space-y-2">
                  <li>✅ Integrated into any ATS</li>
                  <li>
                    ✅ Automatically receive due diligence data on all your
                    applicants directly in your ATS
                  </li>
                  <li>
                    ✅ Candidate Report, an in depth analysis of the
                    candidate&#39;s data
                  </li>
                  <li>✅ Due Diligence data for 10000 applicants/mo</li>
                  <li>✅ 1 Seat license</li>
                  <li>Soon: Post jobs to your TG & Discord</li>
                </ul>
                <div className="px-6 pb-6">
                  <HomePageButton
                    hasBorder
                    text="Get Started"
                    url={DUCK_TELEGRAM_URL}
                  />
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="z-30 flex flex-col bg-white border rounded-md bg-opacity-5 border-primary">
                <div className="p-6 border-b border-default">
                  <h3
                    className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}
                  >
                    Enterprise
                  </h3>
                  <p className="text-center text-md text-subtle">
                    ATS Integration + Safu
                  </p>
                  <h3
                    className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}
                  >
                    Custom
                  </h3>
                </div>
                <ul className="flex-grow p-6 space-y-2">
                  <li>✅ Integrated into any ATS</li>
                  <li>
                    ✅ Automatically receive due diligence data on all your
                    applicants directly in your ATS
                  </li>
                  <li>
                    ✅ Candidate Report, an in depth analysis of the
                    candidate&#39;s data
                  </li>
                  <li>
                    ✅ Due Diligence data for more than 10000 applicants/mo
                  </li>
                  <li>✅ Volume discounts on seats</li>
                  <li>Soon: Post jobs to your TG & Discord</li>
                </ul>
                <div className="px-6 pb-6">
                  <HomePageButton
                    hasBorder
                    text="Get Started"
                    url={DUCK_TELEGRAM_URL}
                  />
                </div>
              </div>
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
            <div className="grid grid-cols-1 gap-4 mb-4 place-content-center lg:grid-cols-3 xl:grid-cols-5">
              {/* Essential Plan */}
              <div className="z-30 flex flex-col bg-white border rounded-md bg-opacity-5 border-primary">
                <div className="p-6 border-b border-default">
                  <h3
                    className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}
                  >
                    Comprehensive
                  </h3>
                  <p className="text-center text-md text-subtle">
                    Job Feauturing
                  </p>
                  <h3
                    className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}
                  >
                    $200 <span className="text-lg">/ job</span>
                  </h3>
                </div>
                <ul className="flex-grow p-6 space-y-2">
                  <li>✅ 1 job featured for 3 days</li>
                  <li>✅ 2x the applicants</li>
                  <li>✅ Featured on our homepage</li>
                </ul>
                <div className="px-6 pb-6">
                  <HomePageButton
                    hasBorder
                    text="Get Started"
                    url={DUCK_TELEGRAM_URL}
                  />
                </div>
              </div>
              <div className="z-30 flex flex-col bg-white border rounded-md bg-opacity-5 border-primary">
                <div className="p-6 border-b border-default">
                  <h3
                    className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}
                  >
                    Comprehensive
                  </h3>
                  <p className="text-center text-md text-subtle">
                    Job Feauturing
                  </p>
                  <h3
                    className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}
                  >
                    $300 <span className="text-lg">/ job</span>
                  </h3>
                </div>
                <ul className="flex-grow p-6 space-y-2">
                  <li>✅ 1 job featured for 7 days</li>
                  <li>✅ 5x the applicants</li>
                  <li>✅ Featured on our homepage</li>
                  <li>
                    ✅ Telegram stories about org, project and job
                  </li>
                  <li>✅ Job Post bumping on Telegram</li>
                  <li>✅ Crossposting</li>
                </ul>
                <div className="px-6 pb-6">
                  <HomePageButton
                    hasBorder
                    text="Get Started"
                    url={DUCK_TELEGRAM_URL}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  </>
);

export default OrganizationsPage;
