import Link from 'next/link';

import {
  DocumentIcon,
  LightBulbIcon,
  ShareIcon,
} from '@heroicons/react/20/solid';
import { Button } from '@nextui-org/react';
import { BotMessageSquare, ListTodo, Rss } from 'lucide-react';

import { ORG_SIGNUP_FORM_URL } from '@jobstash/shared/core';

const features = [
  {
    name: 'Register as an organization',
    description:
      'Fill out a simple form to register your organization on JobStash. Once verified, we will import your jobs right away, no action required on your end.',
    icon: ListTodo,
  },
  {
    name: 'Smart data enrichment',
    description:
      "We automatically enhance your job listings using OpenAI's data structuring tools, adding relevant key metrics like financial data, company insights, and required skills.",
    icon: BotMessageSquare,
  },
  {
    name: 'Sit back while we distribute your jobs',
    description:
      'Your job is published across various channels, including our web app, Telegram, Twitter, and Warpcast. Get your job in front of thousands of potential crypto native candidates in no time.',
    icon: Rss,
  },
];

const timeline = [
  {
    id: 1,
    content:
      'Step 1: Submit Your Career Page Link—We detect and structure your jobs automatically.',
    icon: DocumentIcon,
    iconBackground: 'bg-gray-400',
  },
  {
    id: 2,
    content:
      'Step 2: AI-Enhanced Listings—We enrich your posts with essential data that candidates love.',
    icon: LightBulbIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 3,
    content:
      'Step 3: Instant Distribution—Your jobs get published across top channels, reaching the right talent fast.',
    icon: ShareIcon,
    iconBackground: 'bg-green-500',
  },
];

const classNames = (...classes: (string | undefined)[]): string =>
  classes.filter(Boolean).join(' ');

const JobProcessTimeline = () => (
  <div className="flow-root">
    <ul className="-mb-8">
      {timeline.map((event, eventIdx) => (
        <li key={event.id}>
          <div className="relative pb-8">
            {eventIdx === timeline.length - 1 ? null : (
              <span
                aria-hidden="true"
                className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
              />
            )}
            <div className="relative flex space-x-3">
              <div>
                <span
                  className={classNames(
                    event.iconBackground,
                    'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white',
                  )}
                >
                  <event.icon
                    aria-hidden="true"
                    className="h-5 w-5 text-white"
                  />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 space-x-4 pt-1.5">
                <div>
                  <p className="text-sm text-gray-500">{event.content}</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export const GettingStartedWithJobStash = () => (
  <div className="flex flex-col items-center px-6 gap-16">
    <div className="max-w-2xl text-center flex flex-col gap-6">
      <h2 className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
        How It Works: 3 Simple Steps to Effortlessly Post Your Jobs
      </h2>
      <JobProcessTimeline />
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
    <div className="flex items-center gap-x-6">
      <Button
        as={Link}
        href={ORG_SIGNUP_FORM_URL}
        className="bg-gradient-to-l from-primary to-tertiary font-bold"
        radius="sm"
      >
        Post Your Jobs For Free
      </Button>
      <Button variant="light" radius="sm" as={Link} href="/employers">
        Additional services for Employers <span aria-hidden="true">→</span>
      </Button>
    </div>
  </div>
);
