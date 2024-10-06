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
      'The career page must include a list of job titles, each linking to a dedicated detail page for more information. We recommend a simple list format for easy indexing. Technical requirements are that a job listing page must be available at a URL, and present each job as a separate item as a list of job titles with a link to the job detail page. We support any website and template out there, as well as all leading ATS platforms. If you use an ATS in-house, please provide us with the link to the ATS job list. We are unable to support jobs published on social media platforms like LinkedIn or Facebook, or AngelList/Angel.co/Wellfound due to their lack of open APIs and aggressive anti-scraping measures.',
    icon: ListBulletIcon,
  },
  {
    name: 'Job Listings Page Format',
    description:
      'The format is entirely up to you. We use AI models to extract job list items from your career page, so the structure of the page is not important. However, we recommend a simple list format for easy indexing. If you don\'t have a career page yet and dont want to build a custom webpage, we suggest you use a notion page. There is a notion template called "Job Board" that you can use to create a job board in minutes. Please don\'t use Google Docs, Google Sheets or PDFs as we cannot extract data from these formats. Please refrain from listing your team structure and job titles of your colleagues on the job board, as this will confuse our AI models.',
    icon: ListBulletIcon,
  },
  {
    name: 'Individual Job Detail Pages',
    description:
      "Every job must have its own URL where the job's details can be found. The structure of these pages is entirely up to you. We do not support having multiple jobs on one URL, as we use the URL to uniquely identify each job.",
    icon: DocumentTextIcon,
  },
  {
    name: 'Job Import via LLMs',
    description:
      'We utilize large language models (LLMs) to automatically import job details from the raw vacancy, complete metadata about your jobposts. Our platform uses this data to create structured job listings, making it easier for candidates to find, evaluate and apply for your jobs.',
    icon: CommandLineIcon,
  },
  {
    name: 'Daily Page Monitoring',
    description:
      'We crawl your career page daily to check for new job listings or to check if a job listing went offline, ensuring that your latest vacancies are always visible to potential candidates. If a job listing gets removed from the career page, we will automatically unpublish it from our platform.',
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
