import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';

import { useSetAtom } from 'jotai';

import { mobileRightPanelOpenAtom } from '@jobstash/shared/state';

import { ArrowLeftIcon, Button } from '@jobstash/shared/ui';

const RightPanelBackButton = () => {
  const router = useRouter();

  const setMobileRightPanelOpen = useSetAtom(mobileRightPanelOpenAtom);
  const onClick = useCallback(() => {
    router.push('/jobs', undefined, { shallow: true, scroll: false });

    // Enable main window scroll again
    setMobileRightPanelOpen(false);
  }, [router, setMobileRightPanelOpen]);

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
