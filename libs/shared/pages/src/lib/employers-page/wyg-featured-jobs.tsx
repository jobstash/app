import { ChevronRightIcon, LayoutList, Rss, Sparkle } from 'lucide-react';

import { PDF_JOBSTASH_URL } from '@jobstash/shared/core';

const features = [
  {
    name: 'Enhanced Job Placement',
    description:
      'Position your job listings at the top of feeds for maximum visibility, ensuring they stand out to potential candidates.',
    icon: Sparkle,
  },
  {
    name: 'Cross-Channel Promotion',
    description:
      'Feature your job openings across multiple platforms, including Telegram, Web, and our extensive partner networks, expanding your reach to a larger audience.',
    icon: Rss,
  },
  {
    name: 'Customizable Campaigns',
    description:
      'Receive personalized guidance to craft job ads that resonate with your target audience, driving more engagement and attracting the right talent.',
    icon: LayoutList,
  },
];

export const WygFeaturedJobs = () => (
  <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-16">
    <div className="mx-auto max-w-2xl lg:text-center">
      <div className="flex flex-col gap-4">
        <div className="pt-4">
          <a href={PDF_JOBSTASH_URL} className="inline-flex space-x-6">
            <span className="rounded-full bg-secondary/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-secondary/20">
              Featured Jobs
            </span>
            <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-white/90">
              <span>Learn more</span>
              <ChevronRightIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-500"
              />
            </span>
          </a>
        </div>
        <span className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
          What You&#39;re Getting
        </span>
      </div>
      {/* <p className="mt-6 text-lg leading-8 text-white/90">
        Discover how our platform enhances your job listings, streamlines ATS
        integration, and ensures legitimacy through due diligence, all tailored
        for the crypto industry.
      </p> */}
    </div>
    <div className="mx-auto mt-12 max-w-2xl lg:max-w-none">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.name} className="flex flex-col">
            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white/90">
              <feature.icon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-indigo-400"
              />
              {feature.name}
            </dt>
            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-white/90">
              <p className="flex-auto">{feature.description}</p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);
