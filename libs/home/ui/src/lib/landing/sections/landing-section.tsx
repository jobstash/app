import { memo } from 'react';

import { lato } from '@jobstash/shared/core';

import { Bartab } from '@jobstash/shared/ui';

import { ExploreJobsButton } from './buttons/explore-jobs-button';
import { SubscribeTelegram } from './buttons/subscribe-telegram';
import { NewestJobsSection } from './newest-jobs-section';

const LandingSection = () => (
  <section className="relative mx-auto lg:max-w-6xl">
    <div className="">
      <div className=" w-full mx-auto">
        <div className={`${lato.className} text-center`}>
          <h1 className="font-semibold leading-none text-white text-[80px] md:text-[120px] lg:text-[200px]">
            Job<span className="text-secondary">Stash</span>
          </h1>
          <h2 className="text-xl lg:text-3xl text-white">
            <span className="font-bold opacity-50">tl;dr:</span> Crypto Native
            Job Board
          </h2>
          <div className="mx-auto flex items-center justify-center space-x-8 mt-6 max-w-[400px]">
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

      <div className="mt-8 md:mt-16 bg-gradient-to-r from-secondary to-tertiary p-6 md:px-12 md:py-8 rounded-3xl border-[3px] border-skill9 flex flex-wrap items-center justify-between">
        <div className="grow text-white">
          <h4 className="text-xl font-bold">Elevate Your Talent Search</h4>
          <p className="text-md mt-3">
            JobStash redefines recruitment in crypto, guarding against fraud and
            impostors, connecting you exclusively with genuine, crypto-native
            and crypto-adjacent talent. Welcome to a new era of talent
            discovery, where integrity meets innovation.
          </p>
        </div>
        <div className="w-[150px] mt-4 md:mt-0 mx-auto">
          <Bartab isActive={false} variant="wallet">
            Hire on JobStash ATS
          </Bartab>
        </div>
      </div>
    </div>
  </section>
);

export default memo(LandingSection);
