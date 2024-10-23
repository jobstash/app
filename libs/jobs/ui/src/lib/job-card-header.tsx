import { memo, type ReactNode } from 'react';

import { featuredButtonStyle } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { Heading, Text } from '@jobstash/shared/ui';

interface Props {
  title: string;
  timestampText: string;
  isForExperts: boolean;
  isFeatured: boolean;
  bookmarkButton: ReactNode;
}

const JobCardHeader = ({
  title,
  timestampText,
  isForExperts,
  isFeatured,
  bookmarkButton,
}: Props) => {
  const isEmphasized = isForExperts || isFeatured;

  return (
    <div className="sm:flex items-center justify-between">
      {isEmphasized ? (
        <div style={featuredButtonStyle}>
          <Text size="sm" fw="bold">
            {isForExperts ? (
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

        {bookmarkButton}
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
    //
    // width="160" height="60"
    className="w-fit h-[8px]"
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
