import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';

import { useSetAtom } from 'jotai';

import { type RouteSection } from '@jobstash/shared/core';

import { mobileRightPanelOpenAtom } from '@jobstash/shared/state';

import { ArrowLeftIcon, Button } from '@jobstash/shared/ui';

interface Props {
  routeSection: RouteSection;
}

const RightPanelBackButton = ({ routeSection }: Props) => {
  const router = useRouter();

  const setMobileRightPanelOpen = useSetAtom(mobileRightPanelOpenAtom);
  const onClick = useCallback(() => {
    router.push(routeSection, undefined, { shallow: true, scroll: false });

    // Enable main window scroll again
    setMobileRightPanelOpen(false);
  }, [routeSection, router, setMobileRightPanelOpen]);

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
