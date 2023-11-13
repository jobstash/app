import { memo } from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';

import { lato } from '@jobstash/shared/core';

import { LinkButton, Text } from '@jobstash/shared/ui';

const PremiumSection = () => (
  <section className="relative flex flex-col items-center space-y-6 pt-32 lg:mx-auto lg:max-w-6xl lg:pt-56">
    <AnimationOnScroll
      animateOnce
      duration={0.5}
      animateIn="animate__fadeInUp"
      className="mx-auto w-full"
    >
      <div className="flex flex-col gap-8 justify-center items-center">
        <h2
          className={`${lato.variable} text-center font-sans text-2xl font-bold text-white md:max-w-[80%] md:text-4xl md:leading-snug	`}
        >
          Want to 5x your hiring inbound traffic?
          <br />
          <p className="text-primary">Discover our premium offerings</p>
        </h2>

        <LinkButton
          variant="primary"
          size="lg"
          linkProps={{ href: 'https://t.me/duckdegen' }}
        >
          <Text fw="bold" className="px-2">
            Get in touch
          </Text>
        </LinkButton>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-white/60 text-md md:text-lg">
            Our premium offerings can 5x your daily applicant volume. We have a
            reach of up to 13k job seekers and would love to feature your job
            vacancies so that you can hire the best talent rapidly. We do not
            charge your org for listing jobs or for placement fees, but we do
            have premium tiers for featured job ads.
          </p>
        </div>
      </div>
    </AnimationOnScroll>
  </section>
);

export default memo(PremiumSection);
