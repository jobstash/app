import Link from 'next/link';
import { memo, useCallback } from 'react';

import { ORG_SIGNUP_FORM_URL } from '@jobstash/shared/core';

import { Bartab, Text } from '@jobstash/shared/ui';

interface Props {
  isMobile?: boolean;
}

const RequestToBeListedButton = ({ isMobile }: Props) => {
  const onClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.open(ORG_SIGNUP_FORM_URL, '_blank');
    }
  }, []);

  const text = 'Request to be listed';

  if (isMobile) {
    return (
      <Link
        target="_blank"
        href={ORG_SIGNUP_FORM_URL}
        rel="noopener noreferrer"
      >
        <Text className="text-2xl">{text}</Text>
      </Link>
    );
  }

  return (
    <Bartab isActive={false} variant="wallet" left={null} onClick={onClick}>
      {text}
    </Bartab>
  );
};

export default memo(RequestToBeListedButton);
