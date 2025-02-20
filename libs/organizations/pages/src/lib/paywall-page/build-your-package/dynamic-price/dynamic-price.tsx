import Link from 'next/link';

import { Button } from '@nextui-org/react';

import { SUPPORT_TELEGRAM_URL } from '@jobstash/shared/core';

import { GradientText } from '@jobstash/shared/ui';

import { usePricingContext } from '../context';

import { SpringText } from './spring-text';

export const DynamicPrice = () => {
  const { currentPrice, prevPrice, selectedPrices } = usePricingContext();

  const hasSelectedPrice = selectedPrices.length > 0;
  const isFree = hasSelectedPrice && currentPrice === 0;

  const fromAmount = isFree ? 200 : prevPrice;

  return (
    <div className="flex flex-col items-center mt-4 min-h-[50px] justify-center">
      <div className="text-6xl font-bold text-white flex items-center gap-2">
        {hasSelectedPrice ? (
          <>
            $
            <SpringText to={currentPrice} from={fromAmount} duration={1} />
            <span className="text-3xl text-white/70">/month</span>
            <div className="pl-4 flex items-center">
              {!isFree && (
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
              )}
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
  );
};
