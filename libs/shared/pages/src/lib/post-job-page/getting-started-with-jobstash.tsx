import {
  BookX,
  BotMessageSquare,
  ListTodo,
  Rss,
  Wallet,
  Zap,
} from 'lucide-react';

const features = [
  {
    name: 'Submit Your Career Page Link',
    description:
      'Fill out a simple form to register your organization on JobStash. Once verified, we will automatically import your job vacancies.',
    icon: ListTodo,
  },
  {
    name: 'Smart AI-Enhanced Job Listings',
    description:
      "We format and enrich your job posts with essential data that candidates love, ensuring a consistent presentation format. It's fully automatic - no action required on your end.",
    icon: BotMessageSquare,
  },
  {
    name: 'Instant Distribution',
    description:
      'Your jobs get published across top channels, reaching the right talent fast. We also have open APIs for other platforms to consume your job listings.',
    icon: Rss,
  },
];

export const GettingStartedWithJobStash = () => (
  <div className="flex flex-col items-center px-6 gap-16">
    <div className="max-w-2xl text-center flex flex-col gap-6">
      <h2 className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
        3 Simple Steps to Effortlessly Post Your Jobs
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
  </div>
);
