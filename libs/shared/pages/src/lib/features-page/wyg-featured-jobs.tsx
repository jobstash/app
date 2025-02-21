import { LayoutList, Rss, Sparkle } from 'lucide-react';

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
    {/* <div className="mx-auto max-w-2xl lg:text-center">
      <div className="flex flex-col gap-4">
        <span className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
          What You&#39;re Getting
        </span>
      </div>
    </div> */}
    <div className="mx-auto max-w-2xl lg:max-w-none">
      <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
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
