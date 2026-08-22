import Image from 'next/image';

import { Database, Filter, NotebookPen } from 'lucide-react';

const FEATURES = [
  {
    name: 'Opted-in talent',
    description:
      'Discover people who have chosen to be visible, using volunteered contact details and public GitHub activity.',
    icon: Database,
  },
  {
    name: 'Focused discovery',
    description:
      'Filter by experience, organizations, skills, and technical contributions without exposing application contents.',
    icon: Filter,
  },
  {
    name: 'Workspace context',
    description:
      'Keep team lists and notes alongside recent interest signals so your team can coordinate follow-up.',
    icon: NotebookPen,
  },
];

export const SignalsSection = () => (
  <div id="signals" className="flex flex-col gap-8">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl sm:text-center">
        <h2 className="text-base/7 font-semibold text-indigo-400">
          Talent signals for your team
        </h2>
        <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-white sm:text-balance sm:text-5xl">
          Signals
        </p>
        <p className="mt-6 text-lg/8 text-gray-300">
          Find opted-in crypto talent using volunteered details, public data,
          and context your Workspace has saved.
        </p>
      </div>
    </div>

    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative inline-block">
          <Image
            alt="Signals talent search"
            src="/stash-pool-screenshot.png"
            width={2432}
            height={1442}
            className="w-[76rem] rounded-md"
          />
          <div className="absolute inset-x-0 bottom-0 h-[150px] bg-gradient-to-b from-transparent to-[#131316]" />
        </div>
      </div>
    </div>

    <div className="mx-auto max-w-7xl px-8 lg:max-w-[86rem] lg:px-20">
      <dl className="grid grid-cols-1 gap-12 md:gap-y-16 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <div key={feature.name} className="flex flex-col">
            <dt className="flex items-start gap-x-3 font-semibold leading-7 text-white/90">
              <feature.icon
                aria-hidden="true"
                className="mt-1 h-5 w-5 flex-none text-indigo-400"
              />
              <span className="text-lg leading-6">{feature.name}</span>
            </dt>
            <dd className="mt-4 pl-8 text-lg leading-7 text-white/90">
              {feature.description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);
