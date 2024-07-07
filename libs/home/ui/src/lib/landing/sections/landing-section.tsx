import { memo } from 'react';

import { DUCK_TELEGRAM_URL, lato, ORG_PAGE } from '@jobstash/shared/core';

import { ExploreJobsButton } from './buttons/explore-jobs-button';
import { HomePageButton } from './buttons/home-page-button';
import { SubscribeTelegram } from './buttons/subscribe-telegram';
import { GradientContainer } from './gradient-container';
import { NewestJobsSection } from './newest-jobs-section';

const LandingSection = () => (
  <section className="relative mx-auto lg:max-w-6xl">
    <div className="w-full pb-8 mx-auto md:pb-14">
      <div className={`${lato.className} text-center`}>
        <h1 className="font-semibold leading-none text-white text-[60px] md:text-[80px] md:text-[120px]">
          Job<span className="text-secondary">Stash</span>
        </h1>
        <h2 className="text-xl text-white lg:text-3xl">
          <span className="font-bold opacity-50">tl;dr:</span> Crypto Native Job
          Board
        </h2>
        <div className="mx-auto flex flex-wrap items-center justify-center gap-y-4 gap-x-4 mt-6 max-w-[400px]">
          <ExploreJobsButton />
          <SubscribeTelegram />
        </div>
      </div>
    </div>

    <NewestJobsSection />
    <div className="mt-16 space-y-6 md:flex md:gap-6 md:space-y-0">
      <GradientContainer className="flex flex-wrap w-full ">
        <div className="flex flex-col flex-wrap w-full gap-3 text-white grow">
          <span className={`${lato.className} text-xl font-bold`}>
            Feature your job listings on JobStash
          </span>
          <div className="flex flex-col gap-0.5 max-w-3xl text-white/75">
            <span className="text-md">
              Get up to 5x more applicants by featuring your jobs with us. Job
              Featuring is 300$ per week per jobpost, and includes a dedicated
              job post, crossposting promotion, a sticky slot on our homepage
              and custom telegram stories about your job, org and project. You
              must have a verified org on JobStash to feature your job.
            </span>
          </div>
        </div>
        <HomePageButton hasBorder text="Feature your job" url={ORG_PAGE} />
      </GradientContainer>
      <GradientContainer className="flex flex-wrap w-full">
        <div className="flex flex-col flex-wrap w-full gap-3 text-white grow">
          <span className={`${lato.className} text-xl font-bold`}>
            Save time using SAFU ATS
          </span>
          <div className="flex flex-col gap-0.5 max-w-3xl text-white/75">
            <span className="text-md">
              JobStash redefines hiring operations in crypto, guarding against
              fraud and impostors, identifying genuine, crypto-native and
              crypto-adjacent talent, at scale, by relying on verifiable data.
              Our ATS (Applicant Tracking System) is designed to help you hire
              safer, better, and more efficiently. Tired of sifting through a
              sea of impostors? Try SAFU ATS today. Works with your existing HR
              tools, or as a standalone solution integrated with JobStash.
            </span>
          </div>
        </div>
        <HomePageButton hasBorder text="Discover SAFU ATS" url={ORG_PAGE} />
      </GradientContainer>
    </div>

    <GradientContainer className="mt-16">
      <div className="flex flex-col gap-4 text-white grow">
        <span className={`${lato.className} text-xl font-bold`}>
          Did you Hire or Get Hired Using JobStash ?
        </span>
        <span className="text-md text-white/75">
          Drop us a message and tell us how it went!
        </span>
      </div>
      <HomePageButton
        hasBorder
        text="DM us your story"
        url={DUCK_TELEGRAM_URL}
      />
    </GradientContainer>
  </section>
);

export default memo(LandingSection);
