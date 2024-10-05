import { useEffect, useRef } from 'react';

import { useInView, useMotionValue, useSpring } from 'framer-motion';

import { cn } from '@jobstash/shared/utils';

interface Props {
  value: number;
  direction?: 'up' | 'down';
  className?: string;
  delay?: number;
  decimalPlaces?: number;
}

export const StatNumber = ({
  value,
  direction = 'up',
  delay = 0,
  className,
  decimalPlaces = 0,
}: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isInView) {
      timeout = setTimeout(() => {
        motionValue.set(direction === 'down' ? 0 : value);
      }, delay * 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces)));
        }
      }),
    [springValue, decimalPlaces],
  );

  return (
    <dd
      ref={ref}
      className={cn(
        'inline-block text-3xl font-semibold tracking-tight text-white sm:text-6xl tracking-wider',
        className,
      )}
    />
  );
};
