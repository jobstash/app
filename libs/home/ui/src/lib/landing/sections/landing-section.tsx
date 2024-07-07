import { memo } from 'react';

import {
  DUCK_TELEGRAM_URL,
  lato,
  ORG_SIGNUP_FORM_URL,
  PDF_JOBSTASH_URL,
  PDF_SAFU_URL,
} from '@jobstash/shared/core';

import { ExploreJobsButton } from './buttons/explore-jobs-button';
import { HomePageButton } from './buttons/home-page-button';
import { SubscribeTelegram } from './buttons/subscribe-telegram';
import { GradientContainer } from './gradient-container';
import { NewestJobsSection } from './newest-jobs-section';

const LandingSection = () => (
  <section className="relative mx-auto lg:max-w-6xl">
    <div className="">
      <div className="w-full mx-auto ">
        <div className={`${lato.className} text-center`}>
          <h1 className="font-semibold leading-none text-white text-[60px] md:text-[80px] md:text-[120px]">
            Job<span className="text-secondary">Stash</span>
          </h1>
          <h2 className="text-xl text-white lg:text-3xl">
            <span className="font-bold opacity-50">tl;dr:</span> Crypto Native
            Job Board
          </h2>
          <div className="mx-auto flex flex-wrap items-center justify-center gap-y-4 gap-x-4 mt-6 max-w-[400px]">
            <ExploreJobsButton />
            <SubscribeTelegram />
          </div>
          <svg
            className="h-[94px] my-10 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 101"
          >
            <path
              fill="#fff"
              fillOpacity=".1"
              d="M.667 95a5.333 5.333 0 1 1 10.666 0A5.333 5.333 0 0 1 .667 95ZM6 1V0h1v1H6ZM5 95V1h2v94H5ZM5 0h1v2H5V0Z"
            />
          </svg>
        </div>
      </div>

      <NewestJobsSection />
      <div className="mt-16 space-y-6 md:flex md:gap-6 md:space-y-0">
        <GradientContainer className="flex flex-wrap w-full ">
          <div className="flex flex-col flex-wrap w-full gap-3 text-white grow">
            <span className={`${lato.className} text-xl font-bold`}>
              JobStash - A Public Good
            </span>
            <div className="flex flex-col gap-0.5 max-w-3xl text-white/75">
              <span className="text-md">
                Jobstash operates as a public good, indexing and curating job
                listings for thousands of organizations in crypto, absolutely
                for free. To support our mission, we offer premium services to
                organizations looking to elevate their hiring operations. You
                can feature your job listings, advertise your organization, or
                even sponsor our platform. Job Featuring is 300$ per week per
                jobpost, and gives you 5x the applicants.
              </span>
            </div>
          </div>
          <HomePageButton
            hasBorder
            text="JobStash Overview"
            url={PDF_JOBSTASH_URL}
          />
          <HomePageButton
            hasBorder
            text="Add your org to JobStash"
            url={ORG_SIGNUP_FORM_URL}
          />
          <HomePageButton
            hasBorder
            text="Get featured"
            url={DUCK_TELEGRAM_URL}
          />
        </GradientContainer>
        <GradientContainer className="flex flex-wrap w-full">
          <div className="flex flex-col flex-wrap w-full gap-3 text-white grow">
            <span className={`${lato.className} text-xl font-bold`}>
              Hire talent safely with SAFU ATS
            </span>
            <div className="flex flex-col gap-0.5 max-w-3xl text-white/75">
              <span className="text-md">
                JobStash redefines hiring operations in crypto, guarding against
                fraud and impostors, identifying genuine, crypto-native and
                crypto-adjacent talent, at scale, by relying on verifiable data.
                Our ATS (Applicant Tracking System) is designed to help you hire
                safer, better, and more efficiently. Tired of sifting through a
                sea of impostors? Try SAFU ATS today. Works with your existing
                HR tools!
              </span>
            </div>
          </div>
          <HomePageButton
            hasBorder
            text="Discover SAFU ATS"
            url={PDF_SAFU_URL}
          />
          <HomePageButton
            hasBorder
            text="Request a demo"
            url={DUCK_TELEGRAM_URL}
          />
        </GradientContainer>
      </div>
    </div>
  </section>
);

export default memo(LandingSection);
