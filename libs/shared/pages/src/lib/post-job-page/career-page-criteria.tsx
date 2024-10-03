import {
  CommandLineIcon,
  DocumentTextIcon,
  ListBulletIcon,
  RssIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Job Listings Page',
    description:
      'The career page must include a list of job titles, each linking to a dedicated detail page for more information.',
    icon: ListBulletIcon,
  },
  {
    name: 'Individual Job Detail Pages',
    description:
      "Every job must have its own URL where the job's details can be found. The structure of these pages is entirely up to you.",
    icon: DocumentTextIcon,
  },
  {
    name: 'Job Import via LLMs',
    description:
      'We utilize large language models (LLMs) to automatically import job details from the raw vacancy, ensuring up-to-date information.',
    icon: CommandLineIcon,
  },
  {
    name: 'Daily Page Monitoring',
    description:
      'We ping your career page daily to check for updates and new job listings, ensuring that your latest vacancies are always visible to potential candidates.',
    icon: RssIcon,
  },
];

export const CareerPageCriteria = () => (
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl lg:text-center">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-400 pb-4">
          Career Page Criteria
        </h2>
        <span className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
          How We Index Your Jobs
        </span>
      </div>
      <p className="mt-6 text-lg leading-8 text-white/90">
        To ensure smooth integration with our platform, your career page needs
        to meet specific technical standards. These requirements help us
        accurately import and display job listings, keeping them up-to-date and
        visible to the right candidates.
      </p>
    </div>
    <div className="mx-auto mt-16 max-w-4xl sm:mt-20 lg:mt-24">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        {features.map((feature) => (
          <div key={feature.name} className="relative pl-16">
            <dt className="text-base font-semibold leading-7 text-gray-900">
              <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                <feature.icon
                  aria-hidden="true"
                  className="h-6 w-6 text-white"
                />
              </div>
              {feature.name}
            </dt>
            <dd className="mt-2 text-base leading-7 text-white/90">
              {feature.description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);
