/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-is-valid */

import Link from 'next/link';
import { memo } from 'react';

import { useAtom } from 'jotai';

import { GA_EVENT_ACTION } from '@jobstash/shared/core';
import { gaEvent } from '@jobstash/shared/utils';

import { isOpenTopBannerAtom } from '@jobstash/shared/state';

import Text from '../base/text';

const BANNER_TEXT =
  '🎯 October Launch Special: Promote Jobs for only $50/week!';
const CTA_URL = `/employers#pricing`;
const CTA_TEXT = 'Explore This Offer';

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
        <Text className="text-sm text-center sm:text-md">{BANNER_TEXT}</Text>
        <Link passHref legacyBehavior href={CTA_URL} onClick={onClickDonate}>
          <a>
            <Text className="text-sm underline sm:text-md">{CTA_TEXT}</Text>
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
