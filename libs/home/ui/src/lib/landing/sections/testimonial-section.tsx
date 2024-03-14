import { memo } from 'react';

import { lato } from '@jobstash/shared/core';

import { Bartab } from '@jobstash/shared/ui';

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
                <img
                  className="object-center object-cover rounded-full"
                  src="https://placehold.co/600x400/EEE/31343C"
                />
              </div>
            </div>
            <p className="text-md text-white/75 text-left pb-">
              PancakeSwap has the most users of any decentralized platform,
              ever. And those users are now entrusting the platform with over
              $3.4 billion in funds. Will you join them? 1.4 million users in
              the last 30 days 55 million trades made in the last 30 days.
            </p>
            <hr className="border-t border-white/20 mb-3 mt-6" />
            <p className='text-white font-semibold text-md'>Santiago Perez</p>
            <p className='text-white font-semibold text-md'>Crypto Company | Innovation Consultant</p>
            <div className="w-[40px] mt-3">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  className="object-center object-cover "
                  src="https://placehold.co/600x400/EEE/31343C"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-2">
          <div className="rounded-3xl bg-white bg-opacity-5 p-5">
            <div className="h-[60px] w-[60px] mx-auto mb-6">
              <div className="aspect-w-1 aspect-h-1">
                <img
                  className="object-center object-cover rounded-full"
                  src="https://placehold.co/600x400/EEE/31343C"
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
            <p className='text-white font-semibold text-md'>Santiago Perez</p>
            <p className='text-white font-semibold text-md'>Crypto Company | Innovation Consultant</p>
            <div className="w-[40px] mt-3">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  className="object-center object-cover "
                  src="https://placehold.co/600x400/EEE/31343C"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-8  bg-gradient-to-r from-secondary to-tertiary p-6 md:px-12 md:py-8 rounded-3xl border-[3px] border-skill9 flex flex-wrap items-center justify-between">
      <div className="grow text-white">
        <h4 className="text-xl font-bold">
          Want to Get Featured or Boost Your Jobs?
        </h4>
        <p className="text-md mt-3">
          Drop us a message and we will make it happen.
        </p>
      </div>
      <div className="w-[150px] mt-4 md:mt-0 mx-auto">
        <Bartab isActive={false} variant="wallet">
          Contact
        </Bartab>
      </div>
    </div>
  </section>
);

export default memo(TestimonialSection);
