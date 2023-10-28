import { memo, useCallback } from 'react';

import { Bartab } from '@jobstash/shared/ui';

const JOBSTASH_TELEGRAM_URL = 'https://telegram.me/jobstash';

const SubscribeTelegramButton = () => {
  const onClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.open(JOBSTASH_TELEGRAM_URL, '_blank');
    }
  }, []);

  return (
    <Bartab isActive={false} variant="wallet" left={null} onClick={onClick}>
      Subscribe on Telegram
    </Bartab>
  );
};

export default memo(SubscribeTelegramButton);
