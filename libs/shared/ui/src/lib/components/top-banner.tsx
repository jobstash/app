/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/accessible-emoji */

import Link from 'next/link';
import { memo } from 'react';

import { useAtom } from 'jotai';

import { isOpenTopBannerAtom } from '@jobstash/shared/state';

import Text from '../base/text';

const donateURL = `https://explorer.gitcoin.co/#/round/10/0x2871742b184633f8dc8546c6301cbc209945033e/0x2871742b184633f8dc8546c6301cbc209945033e-145`;

const TopBanner = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenTopBannerAtom);

  //
  // const onClose = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="z-[70] fixed top-0 w-full flex justify-center h-10 bg-gradient-to-l from-primary to-tertiary items-center gap-2">
        <Text>🔥 Please support JobStash on Gitcoin Grants 18. </Text>
        <Link passHref legacyBehavior href={donateURL}>
          <a target="_blank">
            <Text className="underline">Donate today</Text>
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
