import { type ReactNode, useMemo } from 'react';

import { useDelayedAuthRender } from '@jobstash/shared/state';

import { CanRenderContext } from '../contexts/can-render-context';

interface Props {
  children: ReactNode;
  requireConnected?: boolean;
}

export const CanRenderProvider = ({
  children,
  requireConnected = true,
}: Props) => {
  const { canRender } = useDelayedAuthRender({ requireConnected });

  const value = useMemo(() => ({ canRender }), [canRender]);

  return (
    <CanRenderContext.Provider value={value}>
      {children}
    </CanRenderContext.Provider>
  );
};
