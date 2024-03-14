import { memo } from 'react';

import { lato } from '@jobstash/shared/core';

import { Bartab } from '@jobstash/shared/ui';


const LandingSection = () => (
  <section className="relative mx-auto lg:max-w-6xl">
    <div className="">
      <div className=" w-full mx-auto">
        <div className={`${lato.className} text-center`}>
          <h1
            className="font-sans font-semibold leading-none text-white text-[80px] md:text-[140px] lg:text-[200px]"
          >
            Job<span className='text-secondary'>Stash</span>
          </h1>
          <h2 className='text-xl lg:text-3xl text-white'>
            <span className='font-bold opacity-50'>tl;dr:</span> Crypto Native Job Board that Pays Referral Bounties
          </h2>
          <div className='mx-auto flex items-center justify-center space-x-8 mt-6 max-w-[400px]'>
              <Bartab
                isActive={false}
                variant="wallet"
              >
                Explore Jobs
              </Bartab>
              <Bartab
                isActive={false}
                variant="wallet"
              >
                Subscribe on Telegram
              </Bartab>
          </div>
          <svg className='h-[94px] my-8 mx-auto' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 101">
            <path fill="#fff" fill-opacity=".1" d="M.667 95a5.333 5.333 0 1 1 10.666 0A5.333 5.333 0 0 1 .667 95ZM6 1V0h1v1H6ZM5 95V1h2v94H5ZM5 0h1v2H5V0Z"/>
          </svg>
        </div>
      </div>

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
      <div className='mt-16 bg-gradient-to-r from-secondary to-tertiary px-12 py-8 rounded-3xl border-[3px] border-skill9 flex items-center justify-between'>
        <div className='grow text-white'>
          <h4 className='text-xl font-bold'>Want to Get Featured or Boost Your Jobs?</h4>
          <p className='text-md mt-3'>Drop us a message and we will make it happen.</p>
        </div>
        <div className='w-[150px]'>
          <Bartab
            isActive={false}
            variant="wallet"
          >
            Contact
          </Bartab>
        </div>
      </div>
    </div>
  </section>
);

export default memo(LandingSection);
