import { memo, useCallback } from 'react';

import { Bartab } from '@jobstash/shared/ui';

const FollowTelegramButton = () => {
  const onClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.open('https://telegram.me/jobstash', '_blank');
    }
  }, []);

  return (
    <Bartab isActive={false} variant="wallet" left={null} onClick={onClick}>
      Follow on Telegram
    </Bartab>
  );
};

export default memo(FollowTelegramButton);
