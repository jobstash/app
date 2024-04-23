/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-is-valid */

import Link from 'next/link';
import { memo } from 'react';

import { useAtom } from 'jotai';

import { GA_EVENT_ACTION } from '@jobstash/shared/core';
import { gaEvent } from '@jobstash/shared/utils';

import { isOpenTopBannerAtom } from '@jobstash/shared/state';

import Text from '../base/text';

const bannerText = '🔥 Please support us on GitCoin GG20';
const donateURL = `https://explorer.gitcoin.co/#/round/42161/25/121`;

const onClickDonate = () => {
  gaEvent(GA_EVENT_ACTION.DONATE_CLICK, {
    donate_click_element: 'gg20',
  });
};

const TopBanner = () => {
  const [isOpen] = useAtom(isOpenTopBannerAtom);

  if (!isOpen) return null;

  return (
    <>
      <div className="z-[70] fixed top-0 w-full flex justify-center h-10 bg-gradient-to-l from-primary to-tertiary items-center py-8 pb-6 sm:py-0 sm:gap-1 flex-col sm:flex-row ">
        <Text className="text-center text-sm sm:text-md">{bannerText}</Text>
        <Link passHref legacyBehavior href={donateURL} onClick={onClickDonate}>
          <a target="_blank">
            <Text className="underline text-sm sm:text-md">
              Discover our impact
            </Text>
          </a>
        </Link>
      </div>
      {/* <div className="z-[80] fixed top-0 right-0">
        <Button onClick={onClose}>X</Button>
      </div> */}
    </>
  );
};

export default memo(TopBanner);
