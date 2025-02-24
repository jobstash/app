import Image from 'next/image';

import { ListCheck } from 'lucide-react';

const TITLE = 'StashAlert';
const SUBTITLE = 'Real-Time Hiring Insights';
const DESCRIPTION =
  "Stay ahead with real-time alerts on your competitors' latest recruitment trends. StashAlert helps you track hiring patterns, talent movement, and emerging opportunities in the crypto job market.";

const FEATURES = [
  {
    name: 'Competitor Hiring Alerts',
    description:
      'Get notified when key competitors post new roles or expand their teams, keeping you ahead of market trends.',
  },
  {
    name: 'Talent Movement Tracking',
    description:
      'Monitor job changes and team shifts in the crypto industry to identify top talent and potential hires.',
  },
  {
    name: 'Customizable Insights',
    description:
      'Set up tailored alerts for specific organizations, roles, and regions to receive only the most relevant updates.',
  },
  {
    name: 'Seamless Workflow Integration',
    description:
      'Integrate StashAlert with your existing ATS or Slack to get hiring insights delivered where you need them.',
  },
];

export const StashAlertSection = () => (
  <div id="stash-alert" className="max-w-7xl mx-auto md:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
      <div className="flex flex-col gap-6 px-6 lg:px-0 lg:pr-4 lg:pt-4">
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-indigo-400">
            {SUBTITLE}
          </span>
          <h2 className="bg-gradient-to-r from-white to-secondary bg-clip-text text-4xl font-bold text-transparent">
            {TITLE}
          </h2>
        </div>
        <p className="text-lg leading-8 text-white/90">{DESCRIPTION}</p>
        <dl className="space-y-8 text-base leading-7 text-white/90">
          {FEATURES.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-white/90">
                <ListCheck
                  aria-hidden="true"
                  className="absolute left-1 top-1 h-5 w-5 text-indigo-400"
                />
                {`${feature.name}. `}
              </dt>
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex justify-center mt-4 md:mt-0 lg:pt-12">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-background/10 to-transparent rounded-md" />
          <Image
            alt="Job Details"
            src="/stash-alert-screenshot.png"
            width={541}
            height={640}
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  </div>
);
