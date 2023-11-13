import { memo } from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';

import { lato } from '@jobstash/shared/core';

const TooLateSection = () => (
  <section className="relative flex flex-col items-center space-y-6 pt-32 lg:mx-auto lg:max-w-6xl lg:pt-56">
    <AnimationOnScroll
      animateOnce
      duration={0.5}
      animateIn="animate__fadeInUp"
      className="mx-auto w-full"
    >
      <div className="flex flex-col gap-4 justify-center items-center">
        <h2
          className={`${lato.variable} text-center font-sans text-2xl  font-bold text-white md:max-w-[80%] md:text-4xl md:leading-snug	`}
        >
          Tired of applying too late? <p className="text-primary">We Are Too</p>
        </h2>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-white/60 text-md md:text-lg">
            We crawl organization job sites continuously to bring you all the
            job ads we can discover as soon as we find them, giving you the
            highest chances to land that dream job.
          </p>
        </div>
      </div>
    </AnimationOnScroll>
  </section>
);

export default memo(TooLateSection);
