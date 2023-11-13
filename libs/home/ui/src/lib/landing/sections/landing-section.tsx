import { memo } from 'react';

import { lato } from '@jobstash/shared/core';

import { LinkButton } from '@jobstash/shared/ui';

const LandingSection = () => (
  <section className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full items-center justify-center lg:max-w-6xl">
    <div className="animation-fadeIn flex w-full flex-wrap justify-between lg:items-center">
      <div className="flex w-full flex-col lg:w-3/5">
        <div className="space-y-8">
          <h1
            className={`${lato.variable} text-red=500 max-w-[280px] md:max-w-lg font-sans text-4xl font-semibold leading-tight text-white md:text-8xl`}
          >
            <p className="text-2xl text-white/30">tl;dr</p>
            The Ultimate <span className="text-primary">Crypto Native</span> Job
            Aggregator
          </h1>
        </div>
      </div>

      <div className="z-10 flex w-full max-w-[384px] items-center pt-12 lg:py-0">
        <div
          className="-mx-4 rounded-3xl p-6 lg:p-8 flex flex-col gap-6"
          style={{
            background:
              'linear-gradient(116.16deg, rgb(22,22,26) 3.32%, rgba(28, 28, 32, 0.9) 96.7%)',
          }}
        >
          <hr className="border-t border-white/10" />
          <h1
            className={`${lato.variable} justify-center text-center text-2xl font-bold text-white`}
          >
            Crypto Native Jobs
          </h1>
          <div className="flex w-full justify-center">
            <LinkButton
              variant="primary"
              size="lg"
              linkProps={{ href: '/jobs' }}
              textProps={{ fw: 'semibold', size: 'md' }}
            >
              Explore Jobs
            </LinkButton>
          </div>
          <p className="text-md text-white/60 text-center md:text-left">
            JobStash is a Job Aggregator for Crytpo Native Jobs. Vacancies are
            imported from organization career pages, and structured using AI to
            make them easily digestable. Our bots work around the clock to bring
            you the newest jobs, and our company and project metadata adds vital
            context, so that you can make informed decisions about your career.
          </p>

          <hr className="border-t border-white/10" />
        </div>
      </div>
    </div>
  </section>
);

export default memo(LandingSection);
