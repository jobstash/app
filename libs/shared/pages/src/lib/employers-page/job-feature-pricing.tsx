import Link from 'next/link';

import { CheckIcon } from '@heroicons/react/20/solid';
import { Button } from '@nextui-org/react';
import { MoveRightIcon } from 'lucide-react';

import { DUCK_TELEGRAM_URL } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { GradientText } from '@jobstash/shared/ui';

const tiers = [
  {
    name: 'Advanced',
    id: 'tier-advanced',
    pricePerJob: '$300',
    description:
      'Elevate your job listing to the next level with 7 days of homepage visibility, 5x the applicants, and added promotion through Telegram stories, post bumping, and crossposting across key channels.',
    features: [
      '1 job featured for 7 days',
      '5x the applicants',
      'Featured on our homepage',
      'Telegram stories about org, project and job',
      'Job Post bumping on Telegram',
      'Crossposting',
    ],
    featured: true,
  },
  {
    name: 'Basic',
    id: 'tier-basic',
    pricePerJob: '$200',
    description:
      'Feature your job for 7 days on our homepage and boost visibility to attract 2x the applicants. Perfect for getting more attention on your listing without the extras.',
    features: [
      '1 job featured for 7 days',
      '2x the applicants',
      'Featured on our homepage',
    ],
    featured: false,
  },
];

export const JobFeaturePricing = () => (
  <div className="relative isolate px-6 lg:px-8">
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-base font-semibold leading-7 text-indigo-400 pb-4">
        Boost Job Listing Now
      </h2>
      <span className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
        Attract More Talent with Featured Jobs
      </span>
    </div>
    <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-white/90">
      Maximize your job&#39;s reach with our featuring options. Whether you need
      2x or 5x the applicants, our plans ensure your listing stands out on our
      homepage, in Telegram stories, and across key channels to attract the best
      talent.
    </p>
    <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
      {tiers.map((tier, tierIdx) => (
        <div
          key={tier.id}
          className={cn(
            tier.featured
              ? 'relative bg-darker-gray/80 shadow-2xl'
              : 'bg-dark/70 sm:mx-8 lg:mx-0',
            tier.featured
              ? ''
              : tierIdx === 0
              ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
              : 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
            'rounded-3xl p-8 ring-1 ring-white/10 sm:p-10',
          )}
        >
          <h3
            id={tier.id}
            className={cn('text-2xl font-bold leading-8 text-gray-900', {
              'bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text font-bold text-transparent text-3xl':
                tierIdx === 0,
            })}
          >
            {tier.name}
          </h3>

          {tierIdx === 0 ? (
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                {tier.pricePerJob}
              </span>
              <span className="text-base text-gray-500">/ job</span>
            </p>
          ) : (
            <div className="flex flex-col gap-0">
              <span className="flex items-baseline gap-x-2 -mb-2">
                <span className="text-5xl font-bold tracking-tight text-white/90">
                  <span className="line-through text-white/60">
                    {tier.pricePerJob}
                  </span>
                </span>

                <span className="text-5xl font-bold tracking-tight text-white/90">
                  $50
                </span>

                <span className="text-base text-gray-500">/ job</span>
              </span>

              <div className="flex gap-x-2">
                <GradientText text="75% OFF" className="text-2xl font-bold" />
              </div>
            </div>
          )}

          <p className="mt-6 text-base leading-7 text-white/90">
            {tier.description}
          </p>
          <ul className="mt-8 space-y-3 leading-6 text-white/90 sm:mt-10">
            {tier.features.map((feature) => (
              <li key={feature} className="flex gap-x-3">
                <CheckIcon
                  aria-hidden="true"
                  className="h-6 w-5 flex-none text-indigo-400"
                />
                {feature}
              </li>
            ))}
          </ul>

          {tierIdx === 0 ? (
            <div className="w-full items-center flex justify-center pt-8">
              <Button
                as={Link}
                href={DUCK_TELEGRAM_URL}
                className={cn('w-5/6', {
                  'bg-gradient-to-l from-primary to-tertiary font-bold':
                    tierIdx === 0,
                })}
              >
                Buy Plan
              </Button>
            </div>
          ) : (
            <div className="pt-8">
              <Button
                variant="light"
                radius="sm"
                as={Link}
                href="/jobs"
                className="font-bold pl-0"
              >
                Promote directly from the job feed
                <span aria-hidden="true">
                  <MoveRightIcon className="w-4 h-4" />
                </span>
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
