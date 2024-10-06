import { memo } from 'react';

import { useAtomValue } from 'jotai';

import { FRONTEND_URL } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { isOpenTopBannerAtom } from '@jobstash/shared/state';

import { LinkButton, Text } from '@jobstash/shared/ui';
import { Brand } from '@jobstash/sidebar/ui';

import NavButton from './nav-button';

const LandingNav = () => {
  const isOpenTopBanner = useAtomValue(isOpenTopBannerAtom);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-base-black p-4 ',
        {
          'mt-[56px] sm:mt-10': isOpenTopBanner,
        },
      )}
    >
      <Brand />
      <div className="hidden items-center space-x-6 font-bold lg:flex">
        <NavButton
          isTransparent
          href="https://t.me/jobstash"
          text="Subscribe on Telegram"
        />
        <NavButton
          isTransparent
          href="https://twitter.com/jobstash_xyz"
          text="Twitter"
        />
        <NavButton
          isTransparent
          href="https://t.me/jobstashxyz"
          text="Community"
        />

        <LinkButton
          variant="primary"
          linkProps={{
            href: `${FRONTEND_URL}/jobs`,
          }}
        >
          <Text fw="semibold" className="px-2">
            App
          </Text>
        </LinkButton>
      </div>
    </header>
  );
};

export default memo(LandingNav);
