import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';

import { ArrowLeftIcon, Button } from '@jobstash/shared/ui';

const RightPanelBackButton = () => {
  const router = useRouter();

  const onClick = useCallback(
    () => router.push('/jobs', undefined, { shallow: true, scroll: false }),
    [router],
  );

  return (
    <Button
      variant="outline"
      left={<ArrowLeftIcon />}
      size="md"
      onClick={onClick}
    >
      Back
    </Button>
  );
};

export default memo(RightPanelBackButton);
