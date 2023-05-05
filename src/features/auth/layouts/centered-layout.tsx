import { ReactNode } from 'react';

import { SideBar } from '~/features/sidebar/components';
import { Loader } from '~/shared/components';

interface Props {
  isLoading?: boolean;
  children: ReactNode;
}

export const CenteredLayout = ({ children, isLoading }: Props) => (
  <div className="w-full pl-52">
    <SideBar />

    <div className="flex h-screen items-center justify-center pl-4">
      <div className="flex flex-col items-center space-y-6">
        <Loader />
        {children}
      </div>
    </div>
  </div>
);
