/* eslint-disable tailwindcss/no-custom-classname */
import { forwardRef, ReactNode } from 'react';

import { Lato } from '@next/font/google';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { clsx } from 'clsx';

import { Text } from '~/shared/components';
import { numFormatter } from '~/shared/utils';

import type { RangeSliderProps } from '../core/interfaces';
import type { RangeValue } from '../core/types';

/**
 * This props are required by radix-ui react-slider
 * We adjust our data structures to play nice with these
 */
interface Props {
  range: RangeSliderProps;
  onChange: (_: RangeValue) => void;
}

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
});

export const RangeSlider = ({
  range: { min, max, step, value, defaultValue, prefix },
  onChange,
}: Props) => (
  <div className="flex gap-x-2">
    <SliderPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      step={step}
      aria-label="value"
      className="relative flex h-5 w-44 cursor-pointer touch-none select-none items-center"
      minStepsBetweenThumbs={1}
      onValueChange={onChange}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-white/60">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-gradient-to-l from-primary to-secondary" />
      </SliderPrimitive.Track>

      <TooltipPrimitive.Provider>
        <RangeThumb value={value[0]} prefix={prefix} />
        <RangeThumb value={value[1]} prefix={prefix} />
      </TooltipPrimitive.Provider>
    </SliderPrimitive.Root>
  </div>
);

const Thumb = forwardRef<HTMLSpanElement, {}>((_, ref) => (
  <SliderPrimitive.Thumb
    ref={ref}
    className={clsx(
      'block h-5 w-5 rounded-full bg-gradient-to-l from-primary to-secondary',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
    )}
  />
));
Thumb.displayName = 'Thumb';

const RangeInfo = ({ prefix, num }: { prefix: string; num: number }) => (
  <Text
    size="sm"
    className={`${lato.variable} font-sans`}
  >{`${prefix}${numFormatter.format(num)}`}</Text>
);

const RangeThumb = ({ value, prefix }: { value: number; prefix: string }) => (
  <TooltipPrimitive.Root open>
    <TooltipPrimitive.Trigger asChild>
      <Thumb />
    </TooltipPrimitive.Trigger>
    <TooltipPrimitive.Content
      key={value}
      side="bottom"
      sideOffset={5}
      className={clsx(
        'radix-side-top:animate-slide-down-fade',
        'radix-side-right:animate-slide-left-fade',
        'radix-side-bottom:animate-slide-up-fade',
        'radix-side-left:animate-slide-right-fade',
        'inline-flex items-center',
        'rounded bg-zinc-700 py-1 px-2',
      )}
    >
      <TooltipPrimitive.Arrow className="fill-zinc-700" />
      <RangeInfo prefix={prefix} num={value} />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Root>
);
