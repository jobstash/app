import { ReactNode } from 'react';

import { Loader } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

interface Props {
  children?: ReactNode;
}

export const LoadingPage = ({ children }: Props) => (
  <div className="w-full pl-52">
    <SideBar />

    <div className="flex h-screen items-center justify-center pl-4">
      <div className="flex flex-col items-center space-y-6">
        <Loader />
        {children ?? null}
      </div>
    </div>
  </div>
);
