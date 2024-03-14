import { memo } from 'react';

import { lato } from '@jobstash/shared/core';

import { Bartab } from '@jobstash/shared/ui';

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
            <Bartab isActive={false} variant="wallet">
              Explore Jobs
            </Bartab>
            <Bartab isActive={false} variant="wallet">
              Subscribe on Telegram
            </Bartab>
          </div>
          <svg
            className="h-[94px] my-10 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 101"
          >
            <path
              fill="#fff"
              fill-opacity=".1"
              d="M.667 95a5.333 5.333 0 1 1 10.666 0A5.333 5.333 0 0 1 .667 95ZM6 1V0h1v1H6ZM5 95V1h2v94H5ZM5 0h1v2H5V0Z"
            />
          </svg>
        </div>
      </div>

      <div className="z-10 w-full items-center lg:py-0">
        <h3
          className={`${lato.className} text-white font-black text-5xl pb-3 md:text-6xl md:pb-6 text-center`}
        >
          Newest Jobs
        </h3>
        <p className="text-white opacity-75 max-w-[500px] mx-auto text-md text-center">
          JobStash Curates Crypto Native Jobs Across the Entire Crypto
          Ecosystem, Powered by AI and Enhanced by Unique Data Insights—As a
          Public Good.
        </p>
        <div className="flex flex-wrap flex-row mt-10 -mx-2">
          <div className="w-full px-2 mb-4 md:w-1/3 md:mb-0">
            <div className="rounded-3xl bg-white bg-opacity-5 p-5">
              <h3
                className={`${lato.className} justify-center text-xl pb-3 font-bold text-white`}
              >
                Senior Developer Advocate Developer Advocate
              </h3>
              <p className="text-md text-white/75 text-left">
                PancakeSwap has the most users of any decentralized platform,
                ever. And those users are now entrusting the platform with over
                $3.4 billion in funds. Will you join them? 1.4 million users in
                the last 30 days 55 million trades made in the last 30 days.
              </p>
              <hr className="border-t border-white/20 mt-4 mb-6" />
            </div>
          </div>
          <div className="w-full px-2 mb-4 md:w-1/3 md:mb-0">
            <div className="border-[3px] border-skill9 rounded-3xl bg-white bg-opacity-5 p-5">
              <div className="text-sm mb-4 font-semibold px-4 rounded-md bg-skill9 w-[115px] py-1.5 text-center text-white">
                Featured
              </div>
              <div className="">
                <h3
                  className={`${lato.className} justify-center text-xl pb-3 font-bold text-white`}
                >
                  Senior Developer Advocate Developer Advocate
                </h3>
                <div className="flex w-full justify-center"></div>
                <p className="text-md text-white/75 text-left pb-">
                  PancakeSwap has the most users of any decentralized platform,
                  ever. And those users are now entrusting the platform with
                  over $3.4 billion in funds. Will you join them? 1.4 million
                  users in the last 30 days 55 million trades made in the last
                  30 days.
                </p>

                <hr className="border-t border-white/20 mt-4 mb-6" />
              </div>
            </div>
          </div>
          <div className="w-full px-2 mb-4 md:w-1/3 md:mb-0">
            <div className="rounded-3xl bg-white bg-opacity-5 p-5">
              <h3
                className={`${lato.className} justify-center text-xl pb-3 font-bold text-white`}
              >
                Senior Developer Advocate Developer Advocate
              </h3>
              <div className="flex w-full justify-center"></div>
              <p className="text-md text-white/75 text-left">
                PancakeSwap has the most users of any decentralized platform,
                ever. And those users are now entrusting the platform with over
                $3.4 billion in funds. Will you join them? 1.4 million users in
                the last 30 days 55 million trades made in the last 30 days.
              </p>

              <hr className="border-t border-white/20 mt-4 mb-6" />
            </div>
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
