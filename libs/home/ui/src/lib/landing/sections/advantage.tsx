import { ReactNode } from 'react';

import { Heading, Text } from '@jobstash/shared/ui';
import { Bartab } from '@jobstash/shared/ui';

interface AdvantageItem {
  emoji: string;
  desc: string;
}

interface Props {
  icon: ReactNode;
  title: string;
  desc: string;
  advantages: AdvantageItem[];
}

export const Advantage = ({ icon, title, desc, advantages }: Props) => (
  <div className="flex w-full items-start justify-center rounded-2xl first:mb-5 px-2 md:w-1/2 md:px-4">
    <div className="flex w-full flex-col justify-center space-y-4 rounded-2xl bg-[#222224] p-5 md:p-6">
      <div className="flex space-x-4 items-center">
        <div>{icon}</div>
        <div>
          <Heading size="md">{title}</Heading>
        </div>
      </div>
      <div>
        <Text size="md" className="text-white/70">
          {desc}
        </Text>
      </div>

      <div className="py-2">
        <hr className="h-px border-0 bg-white/40" />
      </div>

      <div className="space-y-4 px-3 md:px-6">
        {advantages.map((adv) => (
          <div key={adv.desc} className="flex items-center space-x-4">
            <span>{adv.emoji}</span>
            <Text className="text-white/70">{adv.desc}</Text>
          </div>
        ))}
      </div>
      <div className="pt-2 pb-2 w-[150px] mx-auto">
        <Bartab isActive={false} variant="wallet">
          More details
        </Bartab>
      </div>
    </div>
  </div>
);
