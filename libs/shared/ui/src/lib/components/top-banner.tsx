/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-is-valid */

import Link from 'next/link';
import { memo } from 'react';

import { useAtom } from 'jotai';

import { GA_EVENT_ACTION } from '@jobstash/shared/core';
import { gaEvent } from '@jobstash/shared/utils';

import { isOpenTopBannerAtom } from '@jobstash/shared/state';

import Text from '../base/text';

const BANNER_TEXT = '🚀 Help us secure funding on Gitcoin!';

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
      <div className="z-[70] fixed top-0 w-full py-2 flex justify-center bg-gradient-to-l from-primary to-tertiary items-center sm:gap-1 flex-col sm:flex-row text-sm text-center sm:text-md">
        <Text>{BANNER_TEXT}</Text>
        <div className="flex items-center gap-1">
          <Text>Support</Text>
          <LinkCTA
            href="https://explorer.gitcoin.co/#/round/42161/608/87"
            text="JobStash"
            onClick={onClickDonate}
          />
          <Text>and</Text>
          <LinkCTA
            href="https://explorer.gitcoin.co/#/round/42161/636/3"
            text="GitcoinDonorData"
            onClick={onClickDonate}
          />
        </div>
      </div>
      {/* <div className="z-[80] fixed top-0 right-0">
        <Button onClick={onClose}>X</Button>
      </div> */}
    </>
  );
};

export default memo(TopBanner);

interface LinkCTAProps {
  href: string;
  text: string;
  onClick: () => void;
}

const LinkCTA = ({ href, text, onClick }: LinkCTAProps) => (
  <Link passHref legacyBehavior href={href}>
    <a className="text-sm underline sm:text-md" onClick={onClick}>
      <Text>{text}</Text>
    </a>
  </Link>
);
