/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-is-valid */

import Link from 'next/link';
import { memo } from 'react';

import { useAtom } from 'jotai';

import { GA_EVENT_ACTION } from '@jobstash/shared/core';
import { gaEvent } from '@jobstash/shared/utils';

import { isOpenTopBannerAtom } from '@jobstash/shared/state';

import Text from '../base/text';

const bannerText = '🔥 Please support us on GitCoin GG21';
const donateURL = `https://explorer.gitcoin.co/#/round/42161/385/52`;

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
      <div className="z-[70] fixed top-0 w-full py-2 flex justify-center bg-gradient-to-l from-primary to-tertiary items-center sm:gap-1 flex-col sm:flex-row ">
        <Text className="text-sm text-center sm:text-md">{bannerText}</Text>
        <Link passHref legacyBehavior href={donateURL} onClick={onClickDonate}>
          <a target="_blank">
            <Text className="text-sm underline sm:text-md">
              We&#39;re building a new platform
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
