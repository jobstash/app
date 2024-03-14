import { memo } from 'react';

import { lato } from '@jobstash/shared/core';

import { LinkButton } from '@jobstash/shared/ui';
import { CardSet, createJobTags } from '@jobstash/shared/ui';

const SetsUsSection = () => (
  <section className="relative mx-auto lg:max-w-6xl">
    <svg className='h-[94px] my-8 mx-auto' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 101">
      <path fill="#fff" fill-opacity=".1" d="M.667 95a5.333 5.333 0 1 1 10.666 0A5.333 5.333 0 0 1 .667 95ZM6 1V0h1v1H6ZM5 95V1h2v94H5ZM5 0h1v2H5V0Z"/>
    </svg>
    <div>
        <h3 className='text-white font-black text-6xl pb-6 text-center'>What Sets us Apart</h3>
        <div className='flex flex-wrap flex-row mt-6'>
          <div
            className="w-1/3 rounded-3xl bg-white bg-opacity-5 p-5"
          >
            <h3
              className={`${lato.variable} justify-center text-xl pb-3 font-bold text-white`}
            >
              Senior Developer Advocate Developer Advocate
            </h3>
            <div className="flex w-full justify-center">
              
            </div>
            <p className="text-md text-white/75 text-left pb-">
              PancakeSwap has the most users of any decentralized platform, ever. And those users are now entrusting the platform with over $3.4 billion in funds. Will you join them? 1.4 million users in the last 30 days 55 million trades made in the last 30 days. 
            </p>

            <hr className="border-t border-white/20 mt-4 mb-6" />
            <div>Refer & Earn</div>
            <div className='flex space-x-4'>
              <div>5000</div>
              <div>1000</div>
            </div>
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
           
            <p className="text-md text-white/75 text-left pb-">
              JobStash is a Job Aggregator for Crytpo Native Jobs. Vacancies are
              imported from organization career pages, and structured using AI to
              make them easily digestable. Our bots work around the clock to bring
              you the newest jobs, and our company and project metadata adds vital
              context, so that you can make informed decisions about your career.
            </p>

            <hr className="border-t border-white/20 mt-4 mb-6" />
            <div>Refer & Earn</div>
            <div className='flex space-x-4'>
              <div>5000</div>
              <div>1000</div>
            </div>
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
            <p className="text-md text-white/75 text-left pb-">
              JobStash is a Job Aggregator for Crytpo Native Jobs. Vacancies are
              imported from organization career pages, and structured using AI to
              make them easily digestable. Our bots work around the clock to bring
              you the newest jobs, and our company and project metadata adds vital
              context, so that you can make informed decisions about your career.
            </p>

            <hr className="border-t border-white/20 mt-4 mb-6" />
            <div>Refer & Earn</div>
            <div className='flex space-x-4'>
              <div>5000</div>
              <div>1000</div>
            </div>
          </div>
          <div
            className="w-2/3 rounded-3xl bg-white bg-opacity-5 p-5"
          >
            
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
            <div>Refer & Earn</div>
            <div className='flex space-x-4'>
              <div>5000</div>
              <div>1000</div>
            </div>
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
            <p className="text-md text-white/75 text-left pb-">
              JobStash is a Job Aggregator for Crytpo Native Jobs. Vacancies are
              imported from organization career pages, and structured using AI to
              make them easily digestable. Our bots work around the clock to bring
              you the newest jobs, and our company and project metadata adds vital
              context, so that you can make informed decisions about your career.
            </p>

            <hr className="border-t border-white/20 mt-4 mb-6" />
            <div>Refer & Earn</div>
            <div className='flex space-x-4'>
              <div>5000</div>
              <div>1000</div>
            </div>
          </div>
        </div>
      </div>
  </section>
);

export default memo(SetsUsSection);
