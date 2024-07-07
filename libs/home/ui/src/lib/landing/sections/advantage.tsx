import { ReactNode } from 'react';

import { Heading, Text } from '@jobstash/shared/ui';
import { HomePageButton } from './buttons/home-page-button';

interface AdvantageItem {
  emoji: string;
  desc: string;
}

interface Props {
  icon: ReactNode;
  title: string;
  desc: string;
  advantages: AdvantageItem[];
  buttonTitle: string;
  buttonURL: string;
}

export const Advantage = ({ icon, title, desc, advantages, buttonTitle, buttonURL }: Props) => (
  <div className="flex items-start justify-center w-full px-2 rounded-2xl first:mb-5 md:w-1/2 md:px-4">
    <div className="flex flex-col justify-center w-full p-5 space-y-4 bg-white rounded-2xl bg-opacity-5 md:p-6">
      <div className="flex items-center space-x-4">
        <div>{icon}</div>
        <div>
          <Heading size="md">{title}</Heading>
        </div>
      </div>
      <div>
        <Text size="md" className="inline-block mx-auto text-white/70">
          {desc}
        </Text>
      </div>

      <div className="py-2">
        <hr className="h-px border-0 bg-white/40" />
      </div>

      <div className="px-3 space-y-4 md:px-6">
        {advantages.map((adv) => (
          <div key={adv.desc} className="flex items-center space-x-4">
            <span>{adv.emoji}</span>
            <Text className="inline-block mx-auto text-white/70">{adv.desc}</Text>
          </div>
        ))}
      </div>
      <div className="pt-2 pb-2 w-[150px] mx-auto [&_span]:mx-auto">
        <HomePageButton
          hasBorder
          text={buttonTitle}
          url={buttonURL}
          external={false}
        />
      </div>
    </div>
  </div>
);
