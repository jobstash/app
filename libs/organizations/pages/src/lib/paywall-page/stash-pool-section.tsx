import Image from 'next/image';

import { Filter, Plug, UserCheck } from 'lucide-react';

const TITLE = 'StashPool';
const SUBTITLE = 'Curated Crypto Talent';
const DESCRIPTION =
  'StashPool connects you with a vetted pool of top crypto-native and adjacent talent. Backed by GitHub data, onchain signals, and ecosystem activations, it ensures fast and precise hiring.';

const FEATURES = [
  {
    name: 'Vetted Crypto Talent',
    description:
      'Access a curated pool of candidates with verified GitHub contributions, work history, and ecosystem presence.',
    icon: UserCheck,
  },
  {
    name: 'Targeted Matching',
    description:
      'Filter by experience, past organizations, and technical contributions for precise talent selection.',
    icon: Filter,
  },
  {
    name: 'Seamless Integration',
    description:
      'Connect with Lever, Greenhouse, Workable, or use StashPool’s built-in ATS for streamlined hiring.',
    icon: Plug,
  },
];

export const StashPoolSection = () => (
  <div id="stash-pool" className="flex flex-col gap-8">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl sm:text-center">
        <h2 className="text-base/7 font-semibold text-indigo-400">
          {SUBTITLE}
        </h2>
        <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-white sm:text-balance sm:text-5xl">
          {TITLE}
        </p>
        <p className="mt-6 text-lg/8 text-gray-300">{DESCRIPTION}</p>
      </div>
    </div>

    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Image
            alt="App screenshot"
            src="https://placehold.co/2432x1442/211A3D/white.png"
            width={2432}
            height={1442}
            className="w-[76rem] rounded-md "
          />
          {/* Gradient overlay to fade the bottom of the image */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '150px', // Adjust the height for a stronger or subtler fade
              background:
                'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #131316 100%)',
            }}
          />
        </div>
      </div>
    </div>

    <div className="max-w-7xl lg:max-w-[86rem] mx-auto px-2 lg:px-20">
      <dl className="grid grid-cols-1 gap-12 md:gap-y-16 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <div key={feature.name} className="flex flex-col">
            <dt className="flex items-start gap-x-3 font-semibold leading-7 text-white/90">
              <feature.icon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-indigo-400 mt-1"
              />
              <span className="text-lg leading-6">{feature.name}</span>
            </dt>
            <dd className="mt-4 text-lg leading-7 text-white/90 pl-8">
              {feature.description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);
