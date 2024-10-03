import Image from 'next/image';

import { ListCheck } from 'lucide-react';

const BEST_PRACTICES = [
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
  {
    name: 'Salary and Compensation Information',
    description:
      'Include salary details or a salary range. Transparency about compensation helps attract candidates and improves the quality of applicants.',
  },
  {
    name: 'Highlight Growth Opportunities',
    description:
      'Mention potential career growth or development opportunities within your company. Candidates are often more interested in roles where they can advance their skills and careers.',
  },
  {
    name: 'Clear Application Instructions',
    description:
      "Provide clear instructions on how to apply, whether it's through your website, email, or a third-party platform. Make the process as simple as possible.",
  },
];
export const BestPractices = () => (
  <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
      <div className="flex flex-col gap-6 px-6 lg:px-0 lg:pr-4 lg:pt-4">
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-indigo-400">
            Post Effectively
          </span>
          <h2 className="bg-gradient-to-r from-white to-secondary bg-clip-text text-4xl font-bold text-transparent">
            Job Post That Stands Out
          </h2>
        </div>
        <p className="text-lg leading-8 text-white/90">
          A well-structured job post helps you stand out and reach the right
          candidates. Here&#39;s how to create an engaging, informative listing
          that brings in quality applicants.
        </p>
        <dl className="space-y-8 text-base leading-7 text-white/90">
          {BEST_PRACTICES.map((feature) => (
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
          src="/job-details.png"
          width={541}
          height={1107}
          className="rounded-md"
        />
      </div>
    </div>
  </div>
);
