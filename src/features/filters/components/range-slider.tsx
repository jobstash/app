import * as SliderPrimitive from '@radix-ui/react-slider';
import { clsx } from 'clsx';

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

const Thumb = () => (
  <SliderPrimitive.Thumb
    className={clsx(
      'block h-5 w-5 rounded-full bg-gradient-to-l from-primary to-secondary',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
    )}
  />
);

export const RangeSlider = ({
  range: { min, max, step, value, defaultValue },
  onChange,
}: Props) => (
  <SliderPrimitive.Root
    defaultValue={defaultValue}
    value={value}
    min={min}
    max={max}
    step={step}
    aria-label="value"
    className="relative flex h-5 w-44 cursor-pointer touch-none items-center"
    minStepsBetweenThumbs={1}
    onValueChange={onChange}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-white/60">
      <SliderPrimitive.Range className="absolute h-full rounded-full bg-gradient-to-l from-primary to-secondary" />
    </SliderPrimitive.Track>
    <Thumb />
    <Thumb />
  </SliderPrimitive.Root>
);
