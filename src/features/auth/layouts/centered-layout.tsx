import { ReactNode } from 'react';

import { SideBar } from '~/features/sidebar/components';

import { JobstashCircleLogo } from '../components';

interface Props {
  children: ReactNode;
}

export const CenteredLayout = ({ children }: Props) => (
  <div className="w-full pl-52">
    <SideBar />

    <div className="flex h-screen items-center justify-center pl-4">
      <div className="flex flex-col items-center space-y-6">
        <JobstashCircleLogo />
        {children}
      </div>
    </div>
  </div>
);
