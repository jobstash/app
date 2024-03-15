import Image from 'next/image';
import { memo } from 'react';

import { lato } from '@jobstash/shared/core';

const SetsUsSection = () => (
  <section className="relative mx-auto lg:max-w-6xl">
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
    <div>
      <h3
        className={`${lato.className} text-white font-black text-5xl pb-3 md:text-6xl md:pb-6 text-center`}
      >
        What Sets us Apart
      </h3>
      <div className="flex flex-wrap flex-row mt-6 -mx-2">
        <div className="w-full md:w-1/3 px-2 mb-4">
          <div className="bg-white bg-opacity-5 p-5 rounded-3xl">
            <h3
              className={`${lato.className} justify-center text-xl pb-3 font-bold text-white`}
            >
              Senior Developer Advocate Developer Advocate
            </h3>
            <p className="text-md text-white/75 text-left pb-">
              PancakeSwap has the most users of any decentralized platform,
              ever. And those users are now entrusting the platform with over
              $3.4 billion in funds. Will you join them? 1.4 million users in
              the last 30 days 55 million trades made in the last 30 days.
            </p>
            <div className="mt-6 aspect-w-16 aspect-h-6">
              <Image
                fill
                alt="placeholder"
                className="object-center object-cover"
                src="https://placehold.co/600x400/EEE/31343C/png"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-2 mb-4">
          <div className="bg-white bg-opacity-5 p-5 rounded-3xl">
            <h3
              className={`${lato.className} justify-center text-xl pb-3 font-bold text-white`}
            >
              Senior Developer Advocate Developer Advocate
            </h3>
            <p className="text-md text-white/75 text-left pb-">
              PancakeSwap has the most users of any decentralized platform,
              ever. And those users are now entrusting the platform with over
              $3.4 billion in funds. Will you join them? 1.4 million users in
              the last 30 days 55 million trades made in the last 30 days.
            </p>
            <div className="mt-6 aspect-w-16 aspect-h-6">
              <Image
                fill
                alt="placeholder"
                className="object-center object-cover"
                src="https://placehold.co/600x400/EEE/31343C/png"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-2 mb-4">
          <div className="bg-white bg-opacity-5 p-5 rounded-3xl">
            <h3
              className={`${lato.className} justify-center text-xl pb-3 font-bold text-white`}
            >
              Senior Developer Advocate Developer Advocate
            </h3>
            <p className="text-md text-white/75 text-left pb-">
              PancakeSwap has the most users of any decentralized platform,
              ever. And those users are now entrusting the platform with over
              $3.4 billion in funds. Will you join them? 1.4 million users in
              the last 30 days 55 million trades made in the last 30 days.
            </p>
            <div className="mt-6 aspect-w-16 aspect-h-6">
              <Image
                fill
                alt="placeholder"
                className="object-center object-cover"
                src="https://placehold.co/600x400/EEE/31343C/png"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3 px-2 mb-4">
          <div className="bg-white bg-opacity-5 p-5 rounded-3xl">
            <h3
              className={`${lato.className} justify-center text-xl pb-3 font-bold text-white`}
            >
              Senior Developer Advocate Developer Advocate
            </h3>
            <p className="text-md text-white/75 text-left pb-">
              PancakeSwap has the most users of any decentralized platform,
              ever. And those users are now entrusting the platform with over
              $3.4 billion in funds. Will you join them? 1.4 million users in
              the last 30 days 55 million trades made in the last 30 days.
            </p>
            <div className="mt-6 aspect-w-16 aspect-h-3">
              <Image
                fill
                alt="placeholder"
                className="object-center object-cover"
                src="https://placehold.co/600x400/EEE/31343C/png"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-2">
          <div className="bg-white bg-opacity-5 p-5 rounded-3xl">
            <h3
              className={`${lato.className} justify-center text-xl pb-3 font-bold text-white`}
            >
              Senior Developer Advocate Developer Advocate
            </h3>
            <p className="text-md text-white/75 text-left pb-">
              PancakeSwap has the most users of any decentralized platform,
              ever. And those users are now entrusting the platform with over
              $3.4 billion in funds. Will you join them? 1.4 million users in
              the last 30 days 55 million trades made in the last 30 days.
            </p>
            <div className="mt-6 aspect-w-16 aspect-h-6">
              <Image
                fill
                alt="placeholder"
                className="object-center object-cover"
                src="https://placehold.co/600x400/EEE/31343C/png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default memo(SetsUsSection);
