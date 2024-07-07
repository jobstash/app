import Head from 'next/head';
import { DUCK_TELEGRAM_URL, lato } from '@jobstash/shared/core';
import { Button } from '@nextui-org/button';
import { PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';
import { StatsGrid } from '@jobstash/shared/ui';
import { HomePageButton } from 'libs/home/ui/src/lib/landing/sections/buttons/home-page-button';

const OrganizationsPage = () => (
  <>
    <Head>
      <title>JobStash | Organizations</title>
    </Head>
    <PageWrapper>
      <SideBar />
      <div className="px-6 py-16 md:py-12 md:px-10">
        <section className='pb-6 md:pb-14'>
          <h3
            className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-4 md:pb-8`}
          >
            Organisations
          </h3>
          <p className="text-white opacity-75 max-w-[640px] mx-auto text-lg text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            dignissim porta scelerisque. Praesent venenatis nisi quam, a malesuada
            nunc scelerisque at.
          </p>
        </section>
        <section className='pb-6 md:pb-14'>
          <h3
            className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-4 md:pb-8`}
          >
            Our Stats
          </h3>
          <p className="text-white opacity-75 max-w-[640px] mx-auto text-lg text-center">
            July '24
          </p>
          <div className="mx-auto">
            <StatsGrid />
          </div>
        </section>
        <section className='pb-6 md:pb-14'>
          <h3
            className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-4 md:pb-8`}
          >
            Our Pricing
          </h3>
          <div className="mx-auto">
            <div className="grid grid-cols-1 gap-4 mb-4 place-content-center lg:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {/* Essential Plan */}
              <div className="z-30 flex flex-col bg-white border rounded-md bg-opacity-5 border-primary">
                <div className="p-6 border-b border-default">
                  <h3 className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}>
                    Essential
                  </h3>
                  <p className="text-center text-md text-subtle">JobStash ATS</p>
                  <h3 className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}>
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
                  <h3 className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}>
                    Advanced
                  </h3>
                  <p className="text-center text-md text-subtle">JobStash ATS + Safu</p>
                  <h3 className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}>
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
                  <h3 className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}>
                    Pro
                  </h3>
                  <p className="text-center text-md text-subtle">ATS Integration + Safu</p>
                  <h3 className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}>
                    $499 <span className="text-lg">/ mo</span>
                  </h3>
                </div>
                <ul className="flex-grow p-6 space-y-2">
                  <li>✅ Integrated into any ATS</li>
                  <li>✅ Automatically receive due diligence data on all your applicants directly in your ATS</li>
                  <li>✅ Candidate Report, an in depth analysis of the candidate's data</li>
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
                  <h3 className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}>
                    Elite
                  </h3>
                  <p className="text-center text-md text-subtle">ATS Integration + Safu</p>
                  <h3 className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}>
                    $999 <span className="text-lg">/ mo</span>
                  </h3>
                </div>
                <ul className="flex-grow p-6 space-y-2">
                  <li>✅ Integrated into any ATS</li>
                  <li>✅ Automatically receive due diligence data on all your applicants directly in your ATS</li>
                  <li>✅ Candidate Report, an in depth analysis of the candidate's data</li>
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
                  <h3 className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}>
                    Enterprise
                  </h3>
                  <p className="text-center text-md text-subtle">ATS Integration + Safu</p>
                  <h3 className={`${lato.className} text-center text-3xl pb-3 font-bold text-white`}>
                    Custom
                  </h3>
                </div>
                <ul className="flex-grow p-6 space-y-2">
                  <li>✅ Integrated into any ATS</li>
                  <li>✅ Automatically receive due diligence data on all your applicants directly in your ATS</li>
                  <li>✅ Candidate Report, an in depth analysis of the candidate's data</li>
                  <li>✅ Due Diligence data for more than 10000 applicants/mo</li>
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
        <section className="mx-auto">
          <div>
            <h3
              className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center`}
            >
              Services
            </h3>
            <div className="flex flex-row flex-wrap mx-auto mt-6 -mx-2 lg:max-w-6xl">
              <div className="w-full px-2 mb-4 md:w-1/2">
                <div className="flex flex-wrap justify-start h-full p-5 bg-white bg-opacity-5 rounded-3xl">
                  <h3
                    className={`${lato.className} justify-center text-3xl pb-3 font-bold text-white`}
                  >
                    Feature your Jobs & JobStash Impact and Performance
                  </h3>
                  <p className="text-left text-md text-white/75 grow">
                    Get your jobs featured on JobStash and get 5x more candidates.
                    Learn about the impact and performance of your job listings on JobStash.
                  </p>
                  <Button className="self-end w-full mt-6 font-bold rounded-lg bg-gradient-to-l from-primary to-tertiary">
                    JobStash Overview Deck
                  </Button>
                </div>
              </div>
              <div className="w-full px-2 mb-4 md:w-1/2">
                <div className="flex flex-wrap justify-start h-full p-5 bg-white bg-opacity-5 rounded-3xl">
                  <h3
                    className={`${lato.className} justify-center text-3xl pb-3 font-bold text-white`}
                  >
                    SAFU ATS and Candidate Due Diligence
                  </h3>
                  <p className="text-left text-md text-white/75 grow">
                    Safu ATS is a secure and efficient way to hire talent in the crypto space.
                    It helps you identify genuine, crypto-native and crypto-adjacent talent, at scale,
                    by relying on verifiable data. Safu ATS is designed to help you hire safer, better,
                    and more efficiently.
                  </p>
                  <Button className="self-end w-full mt-6 font-bold rounded-lg bg-gradient-to-l from-primary to-tertiary">
                    SAFU Overview Deck
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative flex flex-col items-center pt-16 lg:mx-auto lg:max-w-6xl">
          <div className="flex flex-col items-center">
            <h3 className="text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-6">
              Our Services
              <span className="block text-secondary"></span>
            </h3>
          </div>
          <div className="flex flex-wrap w-full pt-12 -mx-2 md:-mx-4">
            <div className="w-full px-2 mb-4 md:w-1/2">
              <div className="flex flex-col justify-center w-full p-5 space-y-4 bg-white rounded-2xl bg-opacity-5 md:p-6">
                <h4 className="text-white !leading-tight font-bold text-3xl md:text-4xl text-center pb-4">
                  SAFU ATS and Candidate Due Diligence
                </h4>
                <iframe
                  src="https://drive.google.com/file/d/1VVoyR3vy9xrzy8hwzPUzxOAMvRQLZEQb/preview"
                  width="100%"
                  height="600"
                  allow="autoplay"
                ></iframe>
              </div>
            </div>
            <div className="w-full px-2 mb-4 md:w-1/2">
              <div className="flex flex-col justify-center w-full p-5 space-y-4 bg-white rounded-2xl bg-opacity-5 md:p-6">
                <h4 className="text-white !leading-tight font-bold text-3xl md:text-4xl text-center pb-4">
                  Feature your jobs & JobStash impact and performance
                </h4>
                <iframe
                  src="https://drive.google.com/file/d/1yuVMUrqBe6EgdB76ZVusSt5AWM_QaYxo/preview"
                  width="100%"
                  height="600"
                  allow="autoplay"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  </>
);

export default OrganizationsPage;
