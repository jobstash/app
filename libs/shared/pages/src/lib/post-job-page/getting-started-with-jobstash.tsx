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

export const GettingStartedWithJobStash = () => (
  <div className="flex flex-col items-center px-6 gap-16">
    <div className="max-w-2xl text-center flex flex-col gap-6">
      <h2 className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
        How to get started posting on JobStash
      </h2>
      <p className="text-lg leading-8 text-white/90">
        Just provide a link to your career page, and our AI-powered platform
        will handle the rest. We streamline the process of automatically
        detecting new jobs, unpublishing old jobs, while also transforming raw
        jobposts into concise, structured listings with over 20 key datapoints
        which our users love.
      </p>
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
