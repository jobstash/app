import { memo } from 'react';

import { lato } from '@jobstash/shared/core';

import { Bartab } from '@jobstash/shared/ui';

const TestimonialSection = () => (
  <section className="relative mx-auto lg:max-w-6xl">
      <div className="z-10 w-full items-center pt-12 lg:py-0">
        <h3 className='text-white font-black text-6xl pb-6 text-center'>Highest Bounties</h3>
        <p className='text-white opacity-75 max-w-[500px] mx-auto text-md text-center'>JobStash pays bounties to both the Candidate and the Referrer, 
for successful hiring and even just for being interviewed</p>
        <div className='flex flex-row mt-10 space-x-4'>
          <div
            className="w-1/3 rounded-3xl bg-white bg-opacity-5 p-5"
          >
            <h3
              className={`${lato.variable} justify-center text-xl pb-3 font-bold text-white`}
            >
              Senior Developer Advocate Developer Advocate
            </h3>
            <p className="text-md text-white/75 text-left pb-">
              PancakeSwap has the most users of any decentralized platform, ever. And those users are now entrusting the platform with over $3.4 billion in funds. Will you join them? 1.4 million users in the last 30 days 55 million trades made in the last 30 days. 
            </p>
            <hr className="border-t border-white/20 mt-4 mb-6" />
            {/* <div>Refer & Earn</div> */}
            {/* <div className='flex space-x-4'>
              <div>5000</div>
              <div>1000</div>
            </div> */}
          </div>
          <div
            className="w-1/3 rounded-3xl bg-white bg-opacity-5 p-5 border-[3px] border-skill9"
          >
            <div className='text-sm mb-4 font-semibold px-4 rounded-md bg-skill9 w-[115px] py-1.5 text-center text-white'>Featured</div> 
            <h3
              className={`${lato.variable} justify-center text-xl pb-3 font-bold text-white`}
            >
              Crypto Native Jobs
            </h3>
            <div className="flex w-full justify-center">
              
            </div>
            <p className="text-md text-white/75 text-left pb-">
              JobStash is a Job Aggregator for Crytpo Native Jobs. Vacancies are
              imported from organization career pages, and structured using AI to
              make them easily digestable. Our bots work around the clock to bring
              you the newest jobs, and our company and project metadata adds vital
              context, so that you can make informed decisions about your career.
            </p>

            <hr className="border-t border-white/20 mt-4 mb-6" />
            {/* <div>Refer & Earn</div> */}
            {/* <div className='flex space-x-4'>
              <div>5000</div>
              <div>1000</div>
            </div> */}
          </div>
          <div
            className="w-1/3 rounded-3xl bg-white bg-opacity-5 p-5"
          >
            
            <h3
              className={`${lato.variable} justify-center text-xl pb-3 font-bold text-white`}
            >
              Crypto Native Jobs
            </h3>
            <div className="flex w-full justify-center">
              
            </div>
            <p className="text-md text-white/75 text-left">
              JobStash is a Job Aggregator for Crytpo Native Jobs. Vacancies are
              imported from organization career pages, and structured using AI to
              make them easily digestable. Our bots work around the clock to bring
              you the newest jobs, and our company and project metadata adds vital
              context, so that you can make informed decisions about your career.
            </p>

            <hr className="border-t border-white/20 mt-4 mb-6" />
            {/* <div>Refer & Earn</div> */}
            {/* <div className='flex space-x-4'>
              <div>5000</div>
              <div>1000</div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="mt-8 md:mt-16 bg-gradient-to-r from-secondary to-tertiary p-6 md:px-12 md:py-8 rounded-3xl border-[3px] border-skill9 flex flex-wrap items-center justify-between">
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
