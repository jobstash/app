import {
  CodeBracketIcon,
  CursorArrowRippleIcon,
  EyeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { Chip } from '@nextui-org/react';
import { MoveDown, MoveUp } from 'lucide-react';

import { GradientText } from '@jobstash/shared/ui';

import { AnalyticsStatNumber } from './analytics-stat-number';

const stats = [
  { name: 'Platform Users', value: 3951, icon: UsersIcon, diff: 12 },
  {
    name: 'Job Applications',
    value: 4619,
    icon: CursorArrowRippleIcon,
    diff: 10,
  },
  {
    name: 'Page Visits',
    value: 36_911,
    icon: EyeIcon,
    diff: 10,
  },
  { name: 'Experts', value: 1173, icon: CodeBracketIcon, diff: 11 },
];

export const AnalyticsSection = () => (
  <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 pt-20">
    <div className="mx-auto lg:max-w-none flex flex-col gap-16">
      <div className="text-center flex flex-col gap-4">
        <div className="mx-auto max-w-4xl text-center">
          <span className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
            Crypto Hiring Performance
          </span>
        </div>
        <p className="text-lg leading-8 max-w-3xl self-center text-white/90">
          Our platform continues to drive significant user interaction,
          increasing both visibility and applications for job listings in the
          crypto space. Here&#39;s a snapshot of our monthly performance:
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-4">
        {stats.map(({ name, value, icon: Icon, diff }) => (
          <div
            key={name}
            className="w-full h-52 flex flex-col gap-4 bg-[#1f1f24]/80 py-6 px-4 rounded-2xl justify-center"
          >
            <Icon className="w-7 stroke-2" />

            <div className="flex items-center justify-between">
              <AnalyticsStatNumber value={value} />
              <Chip
                variant="shadow"
                className="bg-secondary/20 text-indigo-400"
                startContent={diff > 0 ? <MoveUp size={20} /> : <MoveDown />}
              >
                <span className="text-lg font-bold">{diff}%</span>
              </Chip>
            </div>

            <div>
              <GradientText
                text={name}
                className="text-2xl font-bold from-[#c6bafb] via-[#bfadff] to-[#8c6df7]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
