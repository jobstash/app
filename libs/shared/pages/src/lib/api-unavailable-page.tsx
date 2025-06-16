import { ReactNode } from 'react';

import { Button, Heading, Text } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

interface Props {
  onRetry?: () => void;
  error?: string | null;
  children?: ReactNode;
}

export const ApiUnavailablePage = ({ onRetry, error, children }: Props) => (
  <div className="w-full lg:pl-52">
    <SideBar />

    <div className="flex h-screen items-center justify-center lg:pl-4">
      <div className="flex flex-col items-center space-y-6 max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <Heading size="xl" fw="semibold">
            Service Temporarily Unavailable
          </Heading>
          <Text color="dimmed">
            We&apos;re experiencing some technical difficulties. Please try
            again in a few moments.
          </Text>
          {error && (
            <Text
              size="sm"
              color="dimmed"
              className="mt-4 p-2 bg-gray-800 rounded text-left"
            >
              Error: {error}
            </Text>
          )}
        </div>

        {onRetry && (
          <Button
            variant="primary"
            textProps={{ fw: 'semibold' }}
            size="md"
            onClick={onRetry}
          >
            Try Again
          </Button>
        )}

        {children}
      </div>
    </div>
  </div>
);
