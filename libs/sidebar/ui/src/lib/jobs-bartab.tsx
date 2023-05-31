import { useRouter } from 'next/router';
import { memo, type ReactNode, useCallback, useMemo } from 'react';

import { Bartab } from '@jobstash/shared/ui';

interface Props {
  children: ReactNode;
  onClickCb?: () => void;
  icon?: ReactNode;
}

const JobsBartab = ({ children, onClickCb, icon }: Props) => {
  const router = useRouter();
  const isActive = useMemo(
    () => router.pathname.slice(0, 5) === '/jobs',
    [router.pathname],
  );

  const onClick = useCallback(() => {
    router.push('/jobs');
    if (onClickCb) {
      onClickCb();
    }
  }, [onClickCb, router]);

  return (
    <Bartab isActive={isActive} left={icon} onClick={onClick}>
      {children}
    </Bartab>
  );
};

export default memo(JobsBartab);
