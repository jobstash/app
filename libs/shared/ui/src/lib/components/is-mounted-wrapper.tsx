import { type ReactNode } from 'react';

import { useIsMounted } from '@jobstash/shared/state';

interface Props {
  children: ReactNode;
}

const IsMountedWrapper = ({ children }: Props) => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return children as any;
};

export default IsMountedWrapper;
