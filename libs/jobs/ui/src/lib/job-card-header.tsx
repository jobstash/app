import { memo, type ReactNode } from 'react';

import { featuredButtonStyle } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { Heading, Text } from '@jobstash/shared/ui';

interface Props {
  title: string;
  timestampText: string;
  isForExperts: boolean;
  isFeatured: boolean;
  isOnboardIntoWeb3: boolean;
  topRightAction: ReactNode;
}

const JobCardHeader = ({
  title,
  timestampText,
  isForExperts,
  isFeatured,
  isOnboardIntoWeb3,
  topRightAction,
}: Props) => {
  const isEmphasized = isForExperts || isFeatured;

  return (
    <div className="flex items-center justify-between">
      {isEmphasized ? (
        <div style={featuredButtonStyle}>
          <Text size="sm" fw="bold">
            {isOnboardIntoWeb3 ? (
              <div className="flex items-center gap-1">
                Job for Web3 Beginners
                <WizardHat />
              </div>
            ) : isForExperts ? (
              <div className="flex items-center gap-1">
                Job for Experts
                <Glasses />
              </div>
            ) : (
              'Featured'
            )}
          </Text>
        </div>
      ) : (
        <Heading size="md" fw="semibold">
          {title}
        </Heading>
      )}
      <hr className="border-t border-white/10 hidden sm:flex" />
      <div className="hidden items-center sm:flex h-full min-w-fit gap-4">
        <span
          className={cn('text-sm', {
            'font-bold text-white': isEmphasized,
          })}
        >
          {timestampText}
        </span>

        {topRightAction}
      </div>
    </div>
  );
};

export default memo(JobCardHeader);

const Glasses = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 160 60"
    className="h-[8px]"
  >
    <path
      d="M0 0 C19.8 0 39.6 0 60 0 C60 6.6 60 13.2 60 20 C63.3 20 66.6 20 70 20 C70 13.4 70 6.8 70 0 C89.8 0 109.6 0 130 0 C130 19.8 130 39.6 130 60 C110.2 60 90.4 60 70 60 C70 50.1 70 40.2 70 30 C66.7 30 63.4 30 60 30 C60 39.9 60 49.8 60 60 C40.2 60 20.4 60 0 60 C0 50.1 0 40.2 0 30 C-6.6 30 -13.2 30 -20 30 C-20 36.6 -20 43.2 -20 50 C-23.3 50 -26.6 50 -30 50 C-30 40.1 -30 30.2 -30 20 C-20.1 20 -10.2 20 0 20 C0 13.4 0 6.8 0 0 Z "
      fill="#D53C5E"
      transform="translate(30,0)"
    />
    <path
      d="M0 0 C6.6 0 13.2 0 20 0 C20 13.2 20 26.4 20 40 C13.4 40 6.8 40 0 40 C0 26.8 0 13.6 0 0 Z "
      fill="#000000"
      transform="translate(130,10)"
    />
    <path
      d="M0 0 C6.6 0 13.2 0 20 0 C20 13.2 20 26.4 20 40 C13.4 40 6.8 40 0 40 C0 26.8 0 13.6 0 0 Z "
      fill="#FFFFFF"
      transform="translate(110,10)"
    />
    <path
      d="M0 0 C6.6 0 13.2 0 20 0 C20 13.2 20 26.4 20 40 C13.4 40 6.8 40 0 40 C0 26.8 0 13.6 0 0 Z "
      fill="#000000"
      transform="translate(60,10)"
    />
    <path
      d="M0 0 C6.6 0 13.2 0 20 0 C20 13.2 20 26.4 20 40 C13.4 40 6.8 40 0 40 C0 26.8 0 13.6 0 0 Z "
      fill="#FFFFFF"
      transform="translate(40,10)"
    />
  </svg>
);

const WizardHat = () => (
  <svg
    viewBox="0 0 320 320"
    xmlns="http://www.w3.org/2000/svg"
    shape-rendering="crispEdges"
    className="w-[28px] h-[28px] mt-1.5"
  >
    <rect width="100%" height="100%" fill="none" />
    <rect
      width="80"
      height="10"
      x="70"
      y="40"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="60"
      height="10"
      x="60"
      y="50"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="120"
      y="50"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="40"
      height="10"
      x="130"
      y="50"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="60"
      y="60"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="20"
      height="10"
      x="90"
      y="60"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="30"
      height="10"
      x="110"
      y="60"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="40"
      height="10"
      x="140"
      y="60"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="60"
      y="70"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="20"
      height="10"
      x="100"
      y="70"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="120"
      y="70"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="60"
      height="10"
      x="130"
      y="70"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="50"
      height="10"
      x="40"
      y="80"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="40"
      height="10"
      x="110"
      y="80"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="150"
      y="80"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="40"
      height="10"
      x="160"
      y="80"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="30"
      height="10"
      x="50"
      y="90"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="20"
      height="10"
      x="120"
      y="90"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="140"
      y="90"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="150"
      y="90"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="160"
      y="90"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="170"
      y="90"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="180"
      y="90"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="20"
      height="10"
      x="190"
      y="90"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="50"
      y="100"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="70"
      y="100"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="20"
      height="10"
      x="130"
      y="100"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="150"
      y="100"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="60"
      height="10"
      x="160"
      y="100"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="100"
      height="10"
      x="130"
      y="110"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="80"
      height="10"
      x="120"
      y="120"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="200"
      y="120"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="20"
      height="10"
      x="210"
      y="120"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="120"
      y="130"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="130"
      y="130"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="50"
      height="10"
      x="140"
      y="130"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="30"
      height="10"
      x="190"
      y="130"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="20"
      height="10"
      x="220"
      y="130"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="80"
      height="10"
      x="120"
      y="140"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="200"
      y="140"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="30"
      height="10"
      x="210"
      y="140"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="40"
      height="10"
      x="120"
      y="150"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="10"
      height="10"
      x="160"
      y="150"
      fill="#ffc925"
      shape-rendering="crispEdges"
    />
    <rect
      width="70"
      height="10"
      x="170"
      y="150"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="130"
      height="10"
      x="110"
      y="160"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="140"
      height="10"
      x="100"
      y="170"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="70"
      height="10"
      x="90"
      y="180"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="50"
      height="10"
      x="160"
      y="180"
      fill="#1f1d29"
      shape-rendering="crispEdges"
    />
    <rect
      width="20"
      height="10"
      x="210"
      y="180"
      fill="#395ed1"
      shape-rendering="crispEdges"
    />
    <rect
      width="180"
      height="10"
      x="70"
      y="190"
      fill="#00499c"
      shape-rendering="crispEdges"
    />
    <rect
      width="220"
      height="10"
      x="50"
      y="200"
      fill="#00499c"
      shape-rendering="crispEdges"
    />
  </svg>
);
