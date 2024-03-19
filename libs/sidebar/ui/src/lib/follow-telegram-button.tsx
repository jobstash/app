import Link from 'next/link';
import { memo, useCallback } from 'react';

import { TELEGRAM_URL } from '@jobstash/shared/core';

import { Text } from '@jobstash/shared/ui';

interface Props {
  isMobile?: boolean;
}

const FollowTelegramButton = ({ isMobile }: Props) => {
  const onClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.open(TELEGRAM_URL, '_blank');
    }
  }, []);

  const text = 'Follow on Telegram';

  if (isMobile) {
    return (
      <Link target="_blank" href={TELEGRAM_URL} rel="noopener noreferrer">
        <Text className="text-2xl">{text}</Text>
      </Link>
    );
  }

  return (
    <Link target="_blank" href={TELEGRAM_URL} rel="noopener noreferrer">
      <Text className="text-md">{text}</Text>
    </Link>
  );
};

export default memo(FollowTelegramButton);
