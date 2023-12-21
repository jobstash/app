import { memo, useCallback } from 'react';

import { ORG_SIGNUP_FORM_URL } from '@jobstash/shared/core';

import { useSidebarContext } from '@jobstash/sidebar/state';

import { Bartab } from '@jobstash/shared/ui';

const RequestToBeListedButton = () => {
  const { isSignedIn } = useSidebarContext();

  const onClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.open(ORG_SIGNUP_FORM_URL, '_blank');
    }
  }, []);

  if (isSignedIn) return null;

  return (
    <Bartab isActive={false} variant="wallet" left={null} onClick={onClick}>
      Request to be listed
    </Bartab>
  );
};

export default memo(RequestToBeListedButton);
