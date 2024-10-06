import Link from 'next/link';

import { Button } from '@nextui-org/react';
import { BotMessageSquare, ListTodo, Rss } from 'lucide-react';

import { ORG_SIGNUP_FORM_URL } from '@jobstash/shared/core';

const features = [
  {
    name: 'Submit Your Career Page Link',
    description:
      'Fill out a simple form to register your organization on JobStash. Once verified, we will automatically import your job vacancies, no matter the source.',
    icon: ListTodo,
  },
  {
    name: 'Let our AI and Data do the Heavy Lifting',
    description:
      "Enjoy enhancement of your job posts with essential data that candidates love, ensuring a consistent presentation format. It's fully automatic - no action required on your end.",
    icon: BotMessageSquare,
  },
  {
    name: 'We Distribute Your Jobs to the Right Audience',
    description:
      'Interview top talent thanks to our unrivalled distribution across top channels, reaching thousands of expert crypto natives. ',
    icon: Rss,
  },
];

export const GettingStartedWithJobStash = () => (
  <div className="flex flex-col items-center px-6 gap-16">
    <div className="max-w-2xl text-center flex flex-col gap-6">
      <h2 className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
        Get from Job Post to Hire in 3 Steps
      </h2>
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
        Post Jobs For Free
      </Button>
      <Button variant="light" radius="sm" as={Link} href="/employers">
        Premium Services<span aria-hidden="true">→</span>
      </Button>
    </div>
  </div>
);
