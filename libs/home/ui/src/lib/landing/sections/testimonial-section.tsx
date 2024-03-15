import Image from 'next/image';
import { memo } from 'react';

import { DUCK_TELEGRAM_URL, lato, TELEGRAM_URL } from '@jobstash/shared/core';

import { HomePageButton } from './buttons/home-page-button';
import { GradientContainer } from './gradient-container';

const TestimonialSection = () => (
  <section className="relative mx-auto mt-8 md:mt-16 lg:max-w-6xl">
    <div className="z-10 w-full items-center pt-12 lg:py-0">
      <h3
        className={`${lato.className} text-white font-black text-5xl pb-3 md:text-6xl md:pb-6 text-center`}
      >
        Testimonials
      </h3>
      <p className="text-white opacity-75 max-w-[500px] mx-auto text-md text-center">
        Some of the best organizations have found talent using JobStash. Here’s
        what they had to say
      </p>
      <div className="flex flex-row flex-wrap mt-10 -mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <div className="rounded-3xl bg-white bg-opacity-5 p-5">
            <div className="h-[60px] w-[60px] mx-auto mb-6">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  fill
                  alt="placeholder"
                  className="object-center object-cover rounded-full"
                  src="https://twitter.com/0xJMG/photo"
                />
              </div>
            </div>
            <p className="text-md text-white/75 text-left pb-">
              In a sea of job platforms, JobStash shines with its unique and
              uncomplicated approach to job aggregation and led by an authentic
              team that genuinely want to help match the best talent. Really
              cool UX and free!
            </p>
            <hr className="border-t border-white/20 mb-3 mt-6" />
            <p className="text-white font-semibold text-md">James Glasscock</p>
            <p className="text-white font-semibold text-md">
              Head of Ecosystem, Reserve Protocol
            </p>
            <div className="w-[40px] mt-3">
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  fill
                  alt="placeholder"
                  className="object-center object-cover "
                  src="https://twitter.com/reserveprotocol/photo"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-full md:w-1/2 px-2">
          <div className="rounded-3xl bg-white bg-opacity-5 p-5">
            <div className="h-[60px] w-[60px] mx-auto mb-6">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  fill
                  alt="placeholder"
                  className="object-center object-cover rounded-full"
                  src="https://placehold.co/600x400/EEE/31343C/png"
                />
              </div>
            </div>
            <p className="text-md text-white/75 text-left pb-">
              JobStash is a Job Aggregator for Crytpo Native Jobs. Vacancies are
              imported from organization career pages, and structured using AI
              to make them easily digestable. Our bots work around the clock to
              bring you the newest jobs, and our company and project metadata
              adds vital context, so that you can make informed decisions about
              your career.
            </p>
            <hr className="border-t border-white/20 mb-3 mt-6" />
            <p className="text-white font-semibold text-md">Santiago Perez</p>
            <p className="text-white font-semibold text-md">
              Crypto Company | Innovation Consultant
            </p>
            <div className="w-[40px] mt-3">
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  fill
                  alt="placeholder"
                  className="object-center object-cover "
                  src="https://placehold.co/600x400/EEE/31343C/png"
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>

    <GradientContainer className="mt-16">
      <div className="grow text-white gap-4 flex flex-col">
        <span className={`${lato.className} text-xl font-bold`}>
          Did you Hire or Get Hired Using JobStash ?
        </span>
        <span className="text-md text-white/75">
          Drop us a message and tell us how it went!
        </span>
      </div>
      <HomePageButton hasBorder text="Contact" onClick={openDuckTelegram} />
    </GradientContainer>
  </section>
);

export default memo(TestimonialSection);

const openDuckTelegram = () => {
  if (typeof window !== 'undefined') {
    window.open(DUCK_TELEGRAM_URL, '_blank');
  }
};

const openTelegram = () => {
  if (typeof window !== 'undefined') {
    window.open(TELEGRAM_URL, '_blank');
  }
};
