import {
  Blocks,
  ChevronRightIcon,
  Network,
  SquareTerminal,
  Star,
  TextSearch,
  UserRoundSearch,
} from 'lucide-react';

import { PDF_VERI_URL } from '@jobstash/shared/core';

const features = [
  {
    name: 'Verified Talent',
    description:
      "Rely on verifiable data, such as GitHub contributions and on-chain history, to ensure that you're hiring genuine crypto-native candidates.",
    icon: UserRoundSearch,
  },
  {
    name: 'Crypto-native Focus',
    description:
      'Veri specializes in identifying developers and professionals who are native to the crypto space, making it easier to find the right talent for your project.',
    icon: SquareTerminal,
  },
  {
    name: 'Upcoming Talent Identification',
    description:
      'Spot and attract rising stars in the industry, even before they have substantial work history, based on their involvement and recognition within the community.',
    icon: Star,
  },
  {
    name: 'ATS Integration',
    description:
      'Seamlessly integrate Veri with your existing ATS, or use our built-in ATS, to track and manage applicants effortlessly.',
    icon: Blocks,
  },
  {
    name: 'Due Diligence Tools',
    description:
      "Access detailed reports on candidates, including work history, contributions, and affiliations, to ensure you're making informed hiring decisions.",
    icon: TextSearch,
  },
  {
    name: 'Ecosystem Data',
    description:
      'Leverage enriched data on organizations, projects, and ecosystems to better understand a candidate’s background and expertise in the crypto space.',
    icon: Network,
  },
];

export const WygVeri = () => (
  <div className="flex flex-col items-center px-6 gap-16 -mt-16">
    <div className="max-w-2xl text-center flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="pt-0">
          <a href={PDF_VERI_URL} className="inline-flex space-x-6">
            <span className="rounded-full bg-secondary/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-secondary/20">
              VERI - Due Diligence
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
      {/* <span className="text-lg leading-8 text-white/90">
        We provide data tools to simplify crypto hiring, helping you find
        authentic, crypto-native, and emerging talent using verifiable data
        instead of CVs.
      </span> */}
    </div>
    <div className="max-w-7xl mx-auto px-2 lg:px-20">
      <dl className="grid grid-cols-1 gap-x-8 gap-y-12 md:gap-y-16 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.name} className="flex flex-col">
            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white/90">
              <feature.icon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-indigo-400"
              />
              {feature.name}
            </dt>
            <dd className="mt-4 text-base leading-7 text-white/90">
              {feature.description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);
