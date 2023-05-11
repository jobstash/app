import * as SliderPrimitive from '@radix-ui/react-slider';
import { clsx } from 'clsx';

interface Props {
  defaultValue: number[];
  min: number;
  max: number;
  step: number;
}

const Thumb = () => (
  <SliderPrimitive.Thumb
    className={clsx(
      'block h-5 w-5 rounded-full bg-gradient-to-l from-primary to-secondary',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
    )}
  />
);

export const RangeSlider = ({ defaultValue, min, max, step }: Props) => (
  <SliderPrimitive.Root
    defaultValue={defaultValue}
    min={min}
    max={max}
    step={step}
    aria-label="value"
    className="relative flex h-5 w-64 cursor-pointer touch-none items-center"
    minStepsBetweenThumbs={1}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-white/60">
      <SliderPrimitive.Range className="absolute h-full rounded-full bg-gradient-to-l from-primary to-secondary" />
    </SliderPrimitive.Track>
    <Thumb />
    <Thumb />
  </SliderPrimitive.Root>
);
