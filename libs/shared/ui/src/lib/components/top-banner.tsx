/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/accessible-emoji */

import Link from 'next/link';
import { memo } from 'react';

import { gaEvent } from '@jobstash/shared/utils';

import Text from '../base/text';

const donateURL = `https://explorer.gitcoin.co/#/round/10/0x2871742b184633f8dc8546c6301cbc209945033e/0x2871742b184633f8dc8546c6301cbc209945033e-145`;

const onClickDonate = () => {
  // eslint-disable-next-line camelcase
  gaEvent('donate_click', { event_category: 'Donation' });
};

const TopBanner = () => (
  <div className="z-[70] fixed top-0 w-full flex justify-center h-10 bg-gradient-to-l from-primary to-tertiary items-center gap-2">
    <Text className="text-center text-sm sm:text-md">
      🔥 Please support JobStash on Gitcoin Grants 18.
    </Text>
    <Link passHref legacyBehavior href={donateURL}>
      <a target="_blank" onClick={onClickDonate}>
        <Text className="underline text-sm sm:text-md">Donate today</Text>
      </a>
    </Link>
  </div>
);

export default memo(TopBanner);
