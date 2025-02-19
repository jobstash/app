import Image from 'next/image';

import { ListCheck } from 'lucide-react';

const FEATURES = [
  {
    name: 'Clear and Specific Job Title',
    description:
      'Start with a clear job title that accurately reflects the position. Candidates should instantly understand the role and level.',
  },
  {
    name: 'Detailed Job Description',
    description:
      'Provide a detailed overview of the role, responsibilities, and required skills. A clear and concise description helps candidates evaluate their fit for the job.',
  },
  {
    name: 'Company Culture and Benefits',
    description:
      "Highlight your company's culture and the benefits you offer. This helps candidates understand the value of working with you and makes your listing more attractive.",
  },
  {
    name: 'Include Location Flexibility',
    description:
      'If the role offers remote work or flexible working options, make sure to highlight that. Flexibility is a major selling point for many candidates.',
  },
];
export const StashAlertSection = () => (
  <div id="stash-alert" className="max-w-7xl mx-auto md:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
      <div className="flex flex-col gap-6 px-6 lg:px-0 lg:pr-4 lg:pt-4">
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-indigo-400">
            Lorem Ipsum Dolor
          </span>
          <h2 className="bg-gradient-to-r from-white to-secondary bg-clip-text text-4xl font-bold text-transparent">
            Dolor Ipsum
          </h2>
        </div>
        <p className="text-lg leading-8 text-white/90">
          A well-structured job post helps you stand out and reach the right
          candidates. Here&#39;s how to create an engaging, informative listing
          that brings in quality applicants.
        </p>
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
