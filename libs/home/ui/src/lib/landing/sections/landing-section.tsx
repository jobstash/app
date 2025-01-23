import { memo } from 'react';

import { lato, SUPPORT_TELEGRAM_URL } from '@jobstash/shared/core';

import { ExploreJobsButton } from './buttons/explore-jobs-button';
import { HomePageButton } from './buttons/home-page-button';
import { PostYourJobButton } from './buttons/post-your-job-button';
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
        <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-4 mt-6">
          <ExploreJobsButton />
          <SubscribeTelegram />
          <PostYourJobButton />
        </div>
      </div>
    </div>

    <NewestJobsSection />

    <div className="mt-16 space-y-6 md:flex md:gap-6 md:space-y-0">
      <GradientContainer className="flex flex-wrap w-full ">
        <div className="flex flex-col flex-wrap w-full gap-3 text-white grow">
          <span className={`${lato.className} text-xl font-bold`}>
            Post a Job
          </span>
          <div className="flex flex-col gap-0.5 max-w-3xl text-white/75">
            <span className="text-md">
              Posting your job on JobStash is completely free, giving you access
              to candidates across the entire crypto ecosystem. Simply verify
              your organization and start listing your job openings. If
              you&#39;d like more visibility, you can choose to feature your
              job, which includes homepage placement, crossposting, and custom
              Telegram stories to attract more applicants.
            </span>
          </div>
        </div>
        <HomePageButton
          hasBorder
          text="Get Started"
          url="/post-job"
          external={false}
        />
      </GradientContainer>
      <GradientContainer className="flex flex-wrap w-full">
        <div className="flex flex-col flex-wrap w-full gap-3 text-white grow">
          <span className={`${lato.className} text-xl font-bold`}>
            Employer Services
          </span>
          <div className="flex flex-col gap-0.5 max-w-3xl text-white/75">
            <span className="text-md">
              Reach up to 5x more candidates with our crypto-focused services.
              We help small teams manage crypto talent without the need for a
              full-time recruiter. Our ATS connects you with verified,
              crypto-native candidates, and our candidate report service quickly
              checks technical resumes for accuracy, all at a cost-effective
              rate.
            </span>
          </div>
        </div>
        <HomePageButton
          hasBorder
          text="Start Hiring"
          url="/employers"
          external={false}
        />
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
        url={SUPPORT_TELEGRAM_URL}
      />
    </GradientContainer>
  </section>
);

export default memo(LandingSection);
