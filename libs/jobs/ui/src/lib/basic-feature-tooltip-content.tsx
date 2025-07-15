import Link from 'next/link';

import { Button } from '@heroui/button';
import { CheckIcon, MoveRightIcon } from 'lucide-react';

import { cn } from '@jobstash/shared/utils';

const tier = {
  name: '📌 to top',
  pricePerJob: '$300',
  description:
    'Sticky your post so it stays 📌 to the top of the jobs page and on the homepage for 🗓 7 days. 5x more views! Pay with any token on most EVM networks, secured by LlamaPay!',
  features: [
    '5x the applicants',
    'Feature this job for 🗓 7 days',
    'Featured on our homepage for 🗓 7 days',
    'Anyone can 📌 any job, permissionlessly!',
  ],
  featured: false,
};

export const BasicFeatureTooltipContent = () => (
  <div className="bg-dark/70 sm:mx-4 lg:mx-0 rounded-3xl p-8 max-w-sm flex flex-col gap-4 relative">
    <div className="space-y-2">
      <h3 className={cn('text-2xl font-bold leading-8 text-white/90')}>
        {tier.name}
      </h3>

      <div className="flex flex-col gap-0">
        <span className="text-5xl font-bold tracking-tight text-white/90">
          {tier.pricePerJob}
        </span>
        {/* <span className="flex items-baseline gap-x-2 -mb-2">
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
        </div> */}
      </div>
    </div>
    <p className="text-base leading-7 text-white/90">{tier.description}</p>
    <ul className="space-y-3 leading-6 text-white/90">
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

    <div className="pt-2">
      <Button
        variant="light"
        radius="sm"
        as={Link}
        href="/post-job"
        className="font-bold pl-0"
      >
        Discover our advanced promotion option
        <span aria-hidden="true">
          <MoveRightIcon className="w-4 h-4" />
        </span>
      </Button>
    </div>
  </div>
);
