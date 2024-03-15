import { memo } from 'react';

import { HomePageButton } from './buttons/home-page-button';
import { lato } from '@jobstash/shared/core';

const GIB_TO_URL = 'https://gib.to/jobstash.eth';

const CoffeeSection = () => (
  <section className="relative mx-auto mt-16 lg:max-w-6xl">
    <div>
      <h3 className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-6`}>
        Support Us
      </h3>
      <p className="text-white opacity-75 max-w-[500px] mx-auto text-md text-center">
        Building JobStash takes an Enormous Amount of Time & Effort. We Are
        Funded by People Like You, by GitCoin and by RetroPGF.
      </p>
      <div className="w-[150px] mx-auto text-center mt-8">
        <HomePageButton hasBorder text="Donate" url={GIB_TO_URL} />
      </div>
    </div>
  </section>
);

export default memo(CoffeeSection);
