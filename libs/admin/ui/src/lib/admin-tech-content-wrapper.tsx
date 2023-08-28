import { type ReactNode } from 'react';

import { LoadingOverlay } from '@mantine/core';

import { useCanRenderContext } from '@jobstash/admin/state';

import { Loader } from '@jobstash/shared/ui';

interface Props {
  isLoading: boolean;
  children: ReactNode;
}

const AdminTechContentWrapper = ({ isLoading, children }: Props) => {
  const { canRender } = useCanRenderContext();

  if (!canRender) return <Loader />;

  return (
    <div className="flex flex-col p-12 pb-8 border border-gray rounded-lg w-1/2 gap-8 relative">
      <LoadingOverlay visible={isLoading} />
      {children}
    </div>
  );
};

export default AdminTechContentWrapper;
