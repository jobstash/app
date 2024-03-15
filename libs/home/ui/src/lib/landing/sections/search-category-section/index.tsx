import Image from 'next/image';
import { memo } from 'react';

import { lato } from '@jobstash/shared/core';

import { Categories } from './categories';

const SearchCategorySection = () => (
  <section className="relative mx-auto lg:max-w-6xl">
    <div className="my-10">
      <svg
        className="w-4/5 md:h-[153px] mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 630 159"
      >
        <path
          fill="#fff"
          fill-opacity=".1"
          d="M.066 153a5.333 5.333 0 1 1 10.667 0 5.333 5.333 0 1 1-10.667 0Zm619.255 0a5.333 5.333 0 1 1 10.666 0 5.333 5.333 0 0 1-10.666 0ZM4.399 153V42.597h2V153h-2ZM5 41.597h.4v2H5v-2Zm.4 0h331.975v2H5.399v-2Zm332.446 1V0h2v42.597h-2ZM623.655 153V42.48h2V153h-2ZM625 43.48h-.345v-2H625v2Zm-.345 0H337.608v-2h287.047v2Z"
        />
      </svg>
    </div>
    <div className="flex flex-col gap-6">
      <h3
        className={`${lato.className} text-white font-black text-5xl md:text-6xl text-center`}
      >
        Search Crypto Jobs by <span className="text-secondary">Category</span>
      </h3>

      <Categories />

      <div className="overflow-hidden whitespace-nowrap relative mt-8">
        <div className="logo_items">
          <div className="inline-flex items-center mr-14">
            <div className="h-[40px] w-[40px]">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  fill
                  alt="placeholder"
                  className="object-center object-cover rounded-xl"
                  src="https://placehold.co/600x400/EEE/31343C/png"
                />
              </div>
            </div>
            <span
              className={`${lato.className} font-bold ml-4 inline-block text-white`}
            >
              Uniswap V3
            </span>
          </div>
          <div className="inline-flex items-center mr-14">
            <div className="h-[40px] w-[40px]">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  fill
                  alt="placeholder"
                  className="object-center object-cover rounded-xl"
                  src="https://placehold.co/600x400/EEE/31343C/png"
                />
              </div>
            </div>
            <span
              className={`${lato.className} font-bold ml-4 inline-block text-white`}
            >
              Uniswap V3
            </span>
          </div>
          <div className="inline-flex items-center mr-14">
            <div className="h-[40px] w-[40px]">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  fill
                  alt="placeholder"
                  className="object-center object-cover rounded-xl"
                  src="https://placehold.co/600x400/EEE/31343C/png"
                />
              </div>
            </div>
            <span
              className={`${lato.className} font-bold ml-4 inline-block text-white`}
            >
              Uniswap V3
            </span>
          </div>
          <div className="inline-flex items-center mr-14">
            <div className="h-[40px] w-[40px]">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  fill
                  alt="placeholder"
                  className="object-center object-cover rounded-xl"
                  src="https://placehold.co/600x400/EEE/31343C/png"
                />
              </div>
            </div>
            <span
              className={`${lato.className} font-bold ml-4 inline-block text-white`}
            >
              Uniswap V3
            </span>
          </div>
          <div className="inline-flex items-center mr-14">
            <div className="h-[40px] w-[40px]">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  fill
                  alt="placeholder"
                  className="object-center object-cover rounded-xl"
                  src="https://placehold.co/600x400/EEE/31343C/png"
                />
              </div>
            </div>
            <span
              className={`${lato.className} font-bold ml-4 inline-block text-white`}
            >
              Uniswap V3
            </span>
          </div>
          <div className="inline-flex items-center mr-14">
            <div className="h-[40px] w-[40px]">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  fill
                  alt="placeholder"
                  className="object-center object-cover rounded-xl"
                  src="https://placehold.co/600x400/EEE/31343C/png"
                />
              </div>
            </div>
            <span
              className={`${lato.className} font-bold ml-4 inline-block text-white`}
            >
              Uniswap V3
            </span>
          </div>
        </div>
        <div className="logo_items" aria-hidden="true">
          <div className="inline-flex items-center mr-14">
            <div className="h-[40px] w-[40px]">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  fill
                  alt="placeholder"
                  className="object-center object-cover rounded-xl"
                  src="https://placehold.co/600x400/EEE/31343C/png"
                />
              </div>
            </div>
            <span
              className={`${lato.className} font-bold ml-4 inline-block text-white`}
            >
              Uniswap V3
            </span>
          </div>
          <div className="inline-flex items-center mr-14">
            <div className="h-[40px] w-[40px]">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  fill
                  alt="placeholder"
                  className="object-center object-cover rounded-xl"
                  src="https://placehold.co/600x400/EEE/31343C/png"
                />
              </div>
            </div>
            <span
              className={`${lato.className} font-bold ml-4 inline-block text-white`}
            >
              Uniswap V3
            </span>
          </div>
          <div className="inline-flex items-center mr-14">
            <div className="h-[40px] w-[40px]">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  fill
                  alt="placeholder"
                  className="object-center object-cover rounded-xl"
                  src="https://placehold.co/600x400/EEE/31343C/png"
                />
              </div>
            </div>
            <span
              className={`${lato.className} font-bold ml-4 inline-block text-white`}
            >
              Uniswap V3
            </span>
          </div>
          <div className="inline-flex items-center mr-14">
            <div className="h-[40px] w-[40px]">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  fill
                  alt="placeholder"
                  className="object-center object-cover rounded-xl"
                  src="https://placehold.co/600x400/EEE/31343C/png"
                />
              </div>
            </div>
            <span
              className={`${lato.className} font-bold ml-4 inline-block text-white`}
            >
              Uniswap V3
            </span>
          </div>
          <div className="inline-flex items-center mr-14">
            <div className="h-[40px] w-[40px]">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  fill
                  alt="placeholder"
                  className="object-center object-cover rounded-xl"
                  src="https://placehold.co/600x400/EEE/31343C/png"
                />
              </div>
            </div>
            <span
              className={`${lato.className} font-bold ml-4 inline-block text-white`}
            >
              Uniswap V3
            </span>
          </div>
          <div className="inline-flex items-center mr-14">
            <div className="h-[40px] w-[40px]">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  fill
                  alt="placeholder"
                  className="object-center object-cover rounded-xl"
                  src="https://placehold.co/600x400/EEE/31343C/png"
                />
              </div>
            </div>
            <span
              className={`${lato.className} font-bold ml-4 inline-block text-white`}
            >
              Uniswap V3
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default memo(SearchCategorySection);
