import { memo, useCallback } from 'react';

import { ORG_SIGNUP_FORM_URL } from '@jobstash/shared/core';

import { Bartab } from '@jobstash/shared/ui';

const RequestToBeListedButton = () => {
  const onClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.open(ORG_SIGNUP_FORM_URL, '_blank');
    }
  }, []);

  return (
    <Bartab isActive={false} variant="wallet" left={null} onClick={onClick}>
      Request to be listed
    </Bartab>
  );
};

export default memo(RequestToBeListedButton);
