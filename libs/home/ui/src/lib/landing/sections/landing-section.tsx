import { memo } from 'react';

import {
  DUCK_TELEGRAM_URL,
  PDF_SAFU_URL,
  PDF_JOBSTASH_URL,
  lato,
} from '@jobstash/shared/core';

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
            Elevate Your Talent Search
          </span>
          <div className="flex flex-col gap-0.5 max-w-3xl text-white/75">
            <span className="text-md">
              JobStash redefines recruitment in crypto, guarding against fraud
              and impostors, connecting you exclusively with genuine,
              crypto-native and crypto-adjacent talent. Welcome to a new era of
              talent discovery, where integrity meets innovation.
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
          text="Hire on JobStash ATS"
          url={DUCK_TELEGRAM_URL}
        />
      </GradientContainer>
      <GradientContainer className="flex flex-wrap w-full">
        <div className="flex flex-col flex-wrap w-full gap-3 text-white grow">
          <span className={`${lato.className} text-xl font-bold`}>
            Elevate Your Talent Search
          </span>
          <div className="flex flex-col gap-0.5 max-w-3xl text-white/75">
            <span className="text-md">
              JobStash redefines recruitment in crypto, guarding against fraud
              and impostors, connecting you exclusively with genuine,
              crypto-native and crypto-adjacent talent. Welcome to a new era of
              talent discovery, where integrity meets innovation.
            </span>
          </div>
        </div>
        <HomePageButton
          hasBorder
          text="Discover JobStash SAFU"
          url={PDF_SAFU_URL}
        />
        <HomePageButton
          hasBorder
          text="Hire on JobStash ATS"
          url={DUCK_TELEGRAM_URL}
        />
      </GradientContainer>
    </div>
  </section>
);

export default memo(LandingSection);
