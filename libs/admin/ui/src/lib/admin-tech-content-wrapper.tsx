import { type ReactNode } from 'react';

import { LoadingOverlay } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { useCanRenderContext } from '@jobstash/admin/state';

import { Loader } from '@jobstash/shared/ui';

interface Props {
  isLoading: boolean;
  children: ReactNode;
  withBorders?: boolean;
  showLoader?: boolean;
}

const AdminTechContentWrapper = ({
  isLoading,
  children,
  withBorders = true,
  showLoader = true,
}: Props) => {
  const { canRender } = useCanRenderContext();

  if (!canRender) return showLoader ? <Loader /> : null;

  return (
    <div
      className={cn('flex flex-col p-12 pb-8 w-1/2 gap-8 relative', {
        'border border-gray rounded-lg': withBorders,
      })}
    >
      <LoadingOverlay visible={isLoading} />
      {children}
    </div>
  );
};

export default AdminTechContentWrapper;
