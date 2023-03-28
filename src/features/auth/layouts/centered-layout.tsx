import { ReactNode } from 'react';

import clsx from 'clsx';

import { SideBar } from '~/features/sidebar/components';

import { JobstashCircleLogo } from '../components';

interface Props {
  isLoading?: boolean;
  children: ReactNode;
}

export const CenteredLayout = ({ children, isLoading }: Props) => (
  <div className="w-full pl-52">
    <SideBar />

    <div className="flex h-screen items-center justify-center pl-4">
      <div className="flex flex-col items-center space-y-6">
        <div className={clsx({ 'animate-bounce': isLoading })}>
          <div className={clsx({ 'animate-pulse': isLoading })}>
            <JobstashCircleLogo />
          </div>
        </div>
        {children}
      </div>
    </div>
  </div>
);
