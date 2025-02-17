import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@nextui-org/button';
import {
  Building2Icon,
  ShieldCheckIcon,
  UserRoundSearchIcon,
} from 'lucide-react';

import { SUPPORT_TELEGRAM_URL } from '@jobstash/shared/core';

import { GradientText } from '@jobstash/shared/ui';

import { FeatureCard } from './feature-card';
import { Price } from './price';

const PRICES = [40, 60, 100];

const features = [
  {
    icon: <ShieldCheckIcon size={36} />,
    title: 'VERI',
    description:
      'Effortlessly validate candidate credentials to build trust and reduce hiring risk.',
    section: 'veri',
  },
  {
    icon: <UserRoundSearchIcon size={36} />,
    title: 'Talent Pool',
    description:
      'Access a curated pool of skilled candidates to simplify and speed up recruitment.',
    section: 'talent-pool',
  },
  {
    icon: <Building2Icon size={36} />,
    title: 'ATS Integration',
    description:
      'Seamlessly connect with your ATS for a smoother and more efficient hiring process.',
    section: 'ats',
  },
];

export const BuildYourPackage = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [prevPrice, setPrevPrice] = useState(0);

  const currentPrice = PRICES[selected.size - 1] ?? 0;

  const toggleFeature = (title: string) => {
    setPrevPrice(currentPrice);
    setSelected((prev) => {
      const newSet = new Set(prev);
      newSet.has(title) ? newSet.delete(title) : newSet.add(title);

      return newSet;
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-400 pb-4">
          Build Your Package
        </h2>
        <span className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
          Pay Only for What You Need
        </span>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-white/90">
        Select your essential hiring tools to create your ideal package. Tailor
        your selection to include only what you truly need, and unlock exclusive
        features and savings.
      </p>

      <div className="flex flex-col items-center mt-4 min-h-[50px] justify-center">
        <div className="text-6xl font-bold text-white flex items-center gap-2">
          {currentPrice ? (
            <>
              $
              <Price to={currentPrice} from={prevPrice} duration={1} />
              <span className="text-3xl text-white/70">/month</span>
              <div className="pl-4 flex items-center">
                <Button
                  size="sm"
                  variant="flat"
                  radius="sm"
                  as={Link}
                  href={SUPPORT_TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Buy Package
                </Button>
              </div>
            </>
          ) : (
            <GradientText
              text="Pick one or more packages below ↓"
              className="text-xl font-semibold"
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 pt-8 gap-x-8 gap-y-12 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            isActive={selected.has(feature.title)}
            onToggle={() => toggleFeature(feature.title)}
            {...feature}
          />
        ))}
      </div>
    </div>
  );
};
