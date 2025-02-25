import Link from 'next/link';

import { Button } from '@heroui/button';
import { CheckIcon, MoveRightIcon } from 'lucide-react';

const info = {
  description:
    'Maximize your reach by keeping your job post in the spotlight and attract more qualified candidates!',
  features: [
    'Extend promotion for another week',
    'Featured on our homepage',
    'Keep all the benefits',
  ],
};

interface Props {
  timeLeft: string;
  oneWeekText: string;
}

export const ExtendPromotionTooltipContent = ({
  timeLeft,
  oneWeekText,
}: Props) => (
  <div className="bg-dark/70 sm:mx-4 lg:mx-0 rounded-3xl p-8 max-w-sm flex flex-col gap-4 relative">
    <div className="space-y-2">
      <div className="w-full justify-between items-center flex">
        <h3 className="text-2xl font-bold leading-8 text-white/90">
          Extend Promotion
        </h3>
        <span>{timeLeft} left</span>
      </div>
      <span className="text-sm">Promotion expires at {oneWeekText}</span>
    </div>
    <p className="text-base leading-7 text-white/90">{info.description}</p>
    <ul className="space-y-3 leading-6 text-white/90">
      {info.features.map((feature) => (
        <li key={feature} className="flex gap-x-3">
          <CheckIcon
            aria-hidden="true"
            className="h-6 w-5 flex-none text-indigo-400"
          />
          {feature}
        </li>
      ))}
    </ul>

    <div className="pt-2">
      <Button
        variant="light"
        radius="sm"
        as={Link}
        href="/employers#pricing"
        className="font-bold pl-0"
      >
        Learn more
        <span aria-hidden="true">
          <MoveRightIcon className="w-4 h-4" />
        </span>
      </Button>
    </div>
  </div>
);
