import { cn } from '@jobstash/shared/utils';

import { GradientBorder } from './gradient-border';
import { useFeatureItemWrapper } from './use-feature-item-wrapper';

const SPOTLIGHT_COLOR = 'rgb(100, 70, 255, 0.3)';

interface Props extends React.PropsWithChildren {
  isSelected: boolean;
  onToggle: () => void;
}

export const FeatureItemWrapper = (props: Props) => {
  const { isSelected, onToggle, children } = props;

  const {
    divRef,
    position,
    opacity,
    handleMouseMove,
    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
  } = useFeatureItemWrapper();

  return (
    <GradientBorder isSelected={isSelected}>
      <div
        ref={divRef}
        className={cn(
          'relative rounded-3xl border border-indigo-700/10 bg-neutral-900/40 overflow-hidden p-8 hover:cursor-pointer',
          { 'bg-white/5': isSelected },
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
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${SPOTLIGHT_COLOR}, transparent 80%)`,
          }}
        />
        {children}
      </div>
    </GradientBorder>
  );
};
