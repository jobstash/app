import { TELEGRAM_URL } from '@jobstash/shared/core';

import { HomePageButton } from './home-page-button';

export const SubscribeTelegram = () => (
  <HomePageButton text="Subscribe on Telegram" url={TELEGRAM_URL} />
);
