import { memo } from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';

import { lato } from '@jobstash/shared/core';

import { Stat } from './stat';

const StatsSection = () => (
  <section className="relative flex flex-col items-center space-y-6 pt-32 lg:mx-auto lg:max-w-6xl lg:pt-56">
    <AnimationOnScroll
      animateOnce
      duration={0.5}
      animateIn="animate__fadeInUp"
      className="mx-auto w-full"
    >
      <div className="flex flex-col items-center">
        <h2
          className={`${lato.variable} text-center font-sans text-2xl font-bold text-white md:max-w-[80%] md:text-4xl md:leading-snug	`}
        >
          Crypto Native Jobs
        </h2>
      </div>
      <div className="mx-auto flex flex-wrap space-y-8 pt-8 md:w-2/3 md:justify-between md:space-x-12 md:space-y-0 lg:flex-nowrap lg:space-x-20">
        {stats.map(({ title, subject, desc }) => (
          <Stat key={title} title={title} subject={subject} desc={desc} />
        ))}
      </div>
    </AnimationOnScroll>
  </section>
);

export default memo(StatsSection);

const stats = [
  {
    title: '1300+',
    subject: 'Crypto Native Jobs',
    desc: 'currently indexed by our platform',
  },
  {
    title: '225+',
    subject: 'Organizations',
    desc: 'looking to hire',
  },
  {
    title: '135+',
    subject: 'dApps',
    desc: 'with additional data FYI',
  },
];
