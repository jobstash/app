import { TELEGRAM_URL } from '@jobstash/shared/core';

import { HomePageButton } from './home-page-button';

const openTelegram = () => {
  if (typeof window !== 'undefined') {
    window.open(TELEGRAM_URL, '_blank');
  }
};

export const SubscribeTelegram = () => (
  <HomePageButton text="Subscribe on Telegram" onClick={openTelegram} />
);
