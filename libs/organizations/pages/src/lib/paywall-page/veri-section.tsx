import Image from 'next/image';

import { ListCheck } from 'lucide-react';

const TITLE = 'VERI Candidate Report';
const SUBTITLE = 'Data-Driven Hiring Intelligence';
const DESCRIPTION =
  "VERI delivers an in-depth analysis of a candidate's background, skills, and real-world contributions. Leveraging GitHub, onchain data, and ecosystem signals, VERI helps you make informed, risk-free hiring decisions.";

const FEATURES = [
  {
    name: 'Proven Work History Verification',
    description:
      'Verify candidates’ past contributions using GitHub commit history and organizational membership. Ensure legitimacy at scale.',
  },
  {
    name: 'Ecosystem Reputation',
    description:
      'Assess candidates through onchain reputation signals, ecosystem activations, and NFT-based event participation.',
  },
  {
    name: 'Crypto-Native Talent Insights',
    description:
      'Distinguish between crypto-native developers, crypto-adjacent talent, and industry newcomers with potential.',
  },
  {
    name: 'Flexible ATS Integration',
    description:
      'Seamlessly integrate with Lever, Greenhouse, Workable, or use VERI’s built-in ATS for optimized candidate tracking.',
  },
];

export const VeriSection = () => (
  <div id="veri" className="max-w-7xl mx-auto md:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
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
      <div className="flex justify-center mt-4 md:mt-0">
        <Image
          alt="Job Details"
          src="https://placehold.co/541x720/211A3D/white.png"
          width={541}
          height={720}
          className="rounded-md"
        />
      </div>
    </div>
  </div>
);
