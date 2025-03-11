import Link from 'next/link';

import {
  ClipboardDocumentListIcon,
  CommandLineIcon,
  DocumentTextIcon,
  LinkIcon,
  ListBulletIcon,
  RssIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@heroui/button';

import { ORG_SIGNUP_FORM_URL } from '@jobstash/shared/core';

const features = [
  {
    name: 'Job Listings Page',
    description:
      'Create a career page that lists job titles, each linking to a detailed job page. We support all websites, leading ATS platforms, but cannot work with jobs listed on LinkedIn, Facebook, or AngelList due to API restrictions.',
    icon: ListBulletIcon,
  },
  {
    name: 'Individual Job Detail Pages',
    description:
      'Each job must have its own URL for detailed information. We cannot support multiple jobs on one URL as each job needs a unique identifier for tracking.',
    icon: DocumentTextIcon,
  },
  {
    name: 'Job Listings Page Format',
    description:
      'We use AI to extract job listings from your career page, regardless of structure. A simple list format is recommended. If you lack a career page, consider using the Notion "Job Board" template (https://www.notion.so/gallery/templates/job-board) for quick setup. Avoid using Google Docs, Sheets, or PDFs as they are not supported.',
    icon: ClipboardDocumentListIcon,
  },
  {
    name: 'Job Import via LLMs',
    description:
      'Our system uses large language models (LLMs) to automatically import job details, complete metadata, and create structured listings, making jobs easy to find and apply for.',
    icon: CommandLineIcon,
  },
  {
    name: 'Daily Page Monitoring',
    description:
      'We monitor your career page daily to detect new jobs or removals, ensuring your latest vacancies are always up-to-date. Removed listings are automatically unpublished.',
    icon: RssIcon,
  },
  {
    name: 'ATS Integration',
    description:
      'If your career page is hosted on an ATS, simply provide us with the job listing link. We are compatible with all major ATS platforms for seamless integration.',
    icon: LinkIcon,
  },
];

export const CareerPageCriteria = () => (
  <div className="max-w-7xl px-6 lg:px-8 flex flex-col self-center gap-12">
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
    <div className="mx-auto max-w-4xl">
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
    <div className="flex items-center gap-x-6 w-full justify-center">
      <Button
        as={Link}
        href={ORG_SIGNUP_FORM_URL}
        className="bg-gradient-to-l from-primary to-tertiary font-bold"
        radius="sm"
      >
        Submit Career Page
      </Button>
      <Button variant="light" radius="sm" as={Link} href="/features">
        Premium Services<span aria-hidden="true">→</span>
      </Button>
    </div>
  </div>
);
