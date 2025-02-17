import React, { ReactNode } from 'react';

interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  isActive?: boolean;
}

export const GradientBorder = ({
  children,
  className = '',
  colors = ['#ffaa40', '#9c40ff', '#ffaa40'],
  animationSpeed = 4,
  isActive = false,
}: GradientBorderProps) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div className={`relative rounded-[1.25rem] overflow-hidden ${className}`}>
      {isActive && (
        <div
          className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient2"
          style={{
            ...gradientStyle,
            backgroundSize: '300% 100%',
          }}
        >
          <div
            className="absolute inset-0 bg-[#0d0d10] rounded-[1.25rem]"
            style={{
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
