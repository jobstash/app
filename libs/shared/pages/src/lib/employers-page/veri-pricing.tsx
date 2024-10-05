import Link from 'next/link';

import { CheckIcon } from '@heroicons/react/20/solid';
import { Button } from '@nextui-org/react';
import { SettingsIcon } from 'lucide-react';

import { DUCK_TELEGRAM_URL } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { GradientText } from '@jobstash/shared/ui';

const tiers = [
  {
    name: 'Essential',
    id: 'tier-essential',
    priceMonthly: '$99',
    description:
      'Ideal for smaller teams or startups looking for a streamlined hiring solution.',
    features: [
      'Access to our JobStash ATS for tracking all applicants',
      'Effortless organization with 1-click apply and seamless hiring management',
      'Tap into our Talent Pool of pre-screened crypto-native candidates',
      'Organization-wide license for your entire team',
      'Coming Soon: Embeddable apply button and custom job board',
      'Coming Soon: Automatic job posting to your Telegram and Discord channels',
    ],
    mostPopular: false,
  },
  {
    name: 'Advanced',
    id: 'tier-advanced',
    priceMonthly: '$199',
    description:
      'For growing organizations needing more advanced data insights.',
    features: [
      'Everything in Essential, plus…',
      'Access to Veri Data: Comprehensive due diligence on candidates, including on-chain and off-chain data',
      'Gain deeper insights into candidates with detailed reports',
      'Organization-wide license for enhanced team collaboration',
      'Coming Soon: Embeddable apply button and custom job board',
      'Coming Soon: Automatic job posting to your Telegram and Discord channels',
    ],
    mostPopular: true,
  },
  {
    name: 'Data Only ATS Integration',
    id: 'tier-pro',
    priceMonthly: '$99',
    description:
      'Designed for large teams or companies needing deeper ATS data integration.',
    features: [
      'Integrated into any ATS',
      'Automatically receive due diligence data on every applicant right in your ATS',
      'Candidate Report: Analyze applicant history, on-chain reputation, and GitHub contributions',
      'Due diligence data for up to 3000 applicants/month',
      '1-seat license for targeted usage',
      'Coming Soon: Automatic job posting to your Telegram and Discord channels',
    ],
    mostPopular: false,
  },
];

export const VeriPricing = () => (
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-base font-semibold leading-7 text-indigo-400 pb-4">
        Hire Safer, Faster and Smarter
      </h2>
      <span className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
        Upgrade Your Hiring Experience
      </span>
    </div>
    <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-white/90">
      While our platform offers essential hiring tools for free,{' '}
      <GradientText
        text="VERI"
        className="text-xl font-bold from-[#c6bafb] via-[#bfadff] to-[#8c6df7]"
      />{' '}
      &#39;s premium plans provide advanced features like due diligence data and
      ATS integrations, bringing greater visibility and efficiency to your
      recruitment process.
    </p>
    <div className="isolate mx-auto mt-12 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {tiers.map((tier, tierIdx) => (
        <div
          key={tier.id}
          className={cn(
            'flex flex-col justify-between rounded-3xl p-8 ring-1 ring-white/10 xl:p-10 bg-dark/70',
            {
              'lg:z-10 lg:rounded-b-none bg-darker-gray/80 ': tier.mostPopular,
            },
            { 'lg:rounded-r-none': tierIdx === 0 },
            { 'lg:rounded-l-none': tierIdx === tiers.length - 1 },
            { 'lg:mt-8': !tier.mostPopular },
          )}
        >
          <div>
            <div className="flex items-center justify-between gap-x-4">
              <h3
                id={tier.id}
                className={cn('text-2xl font-bold leading-8 text-gray-900', {
                  'bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text font-bold text-transparent text-3xl':
                    tier.mostPopular,
                })}
              >
                {tier.name}
              </h3>
              {tier.mostPopular ? (
                <p className="rounded-lg bg-white/10 px-2.5 py-1 text-sm font-semibold leading-5 text-white">
                  Most popular
                </p>
              ) : null}
            </div>
            <p className="mt-4 leading-6 text-white/90">{tier.description}</p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                {tier.priceMonthly}
              </span>
              <span className="text-sm font-semibold leading-6 text-white/90">
                /month
              </span>
            </p>
            <ul className="mt-8 space-y-3 leading-6 text-white/90">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-x-3">
                  {feature.includes('Coming Soon') ? (
                    <SettingsIcon
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-indigo-400"
                    />
                  ) : (
                    <CheckIcon
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-indigo-400"
                    />
                  )}
                  <span className="text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full items-center flex justify-center pt-8">
            <Button
              as={Link}
              href={DUCK_TELEGRAM_URL}
              className={cn('w-5/6', {
                'bg-gradient-to-l from-primary to-tertiary font-bold':
                  tier.mostPopular,
              })}
            >
              Buy Plan
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
