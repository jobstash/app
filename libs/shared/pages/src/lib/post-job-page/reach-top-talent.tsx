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
    name: 'Post your job',
    description:
      'Easily create and submit your job listings with a few simple steps. Our platform helps you structure job data and enhance visibility across multiple channels, ensuring you reach the best candidates.',
    icon: ListTodo,
  },
  {
    name: 'Multi-platform distribution',
    description:
      'Your job is published across various channels, including our web app, Telegram, Twitter, and Discord. Get your job in front of thousands of potential candidates in no time.',
    icon: Rss,
  },
  {
    name: 'Smart data enrichment',
    description:
      "We automatically enhance your job listings using OpenAI's data structuring tools, adding relevant key metrics like financial data, company insights, and required skills.",
    icon: BotMessageSquare,
  },
  {
    name: 'Real-time insights',
    description:
      'Track the performance of your job listings in real time. Get detailed insights on how many people viewed and applied for the position, helping you make data-driven decisions.',
    icon: Zap,
  },
  {
    name: 'Automatic unpublishing',
    description:
      'Once your position is filled, we automatically remove the job listing, ensuring your listings stay up to date without any extra effort.',
    icon: BookX,
  },
  {
    name: 'Curation for crypto-native jobs',
    description:
      'Our platform is specifically designed to cater to the crypto space, providing curated listings for organizations and projects within the Web3 ecosystem.',
    icon: Wallet,
  },
];

export const ReachTopTalent = () => (
  <div className="flex flex-col items-center px-6 gap-16">
    <div className="max-w-2xl text-center flex flex-col gap-6">
      <h2 className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
        Reach Top Talent
      </h2>
      <p className="text-lg leading-8 text-white/90">
        With a few clicks, your job listing can reach thousands of potential
        candidates. Manage applicants, find the right candidates faster, and
        attract top talent in the crypto space.
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
