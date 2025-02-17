/* eslint-disable unicorn/prefer-query-selector */
import React, { useRef, useState } from 'react';

import { Button } from '@nextui-org/button';

import { cn } from '@jobstash/shared/utils';

import { GradientBorder } from './gradient-border';
import { ShinyText } from './shiny-text';

const SCROLL_OFFSET = 140;

interface Position {
  x: number;
  y: number;
}

interface Props extends React.PropsWithChildren {
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive: boolean;
  section: string;
  onToggle: () => void;
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

export const FeatureCard: React.FC<Props> = ({
  icon,
  title,
  description,
  isActive,
  section,
  onToggle,
  className = '',
  spotlightColor = 'rgb(100, 70, 255, 0.3)',
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const onLearnMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    const element = document.getElementById(section);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - SCROLL_OFFSET;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <GradientBorder isActive={isActive}>
      <div
        ref={divRef}
        className={cn(
          'relative rounded-3xl border border-indigo-700/10 bg-neutral-900/40 overflow-hidden p-8 hover:cursor-pointer',
          { 'bg-white/5': isActive },
          className,
        )}
        onClick={onToggle}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
          style={{
            opacity,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
        <div className="flex flex-col gap-4">
          {icon}
          <ShinyText text={title} className="text-2xl font-semibold" />
          <p className="text-gray-200 text-base">{description}</p>
          <div className="flex items-center gap-x-2">
            <Button
              variant={isActive ? 'flat' : 'solid'}
              size="sm"
              radius="sm"
              className="min-w-[112px]"
              onClick={onToggle}
            >
              {isActive ? 'Remove' : 'Add to Package'}
            </Button>
            <Button size="sm" variant="light" radius="sm" onClick={onLearnMore}>
              Learn More <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </div>
    </GradientBorder>
  );
};
