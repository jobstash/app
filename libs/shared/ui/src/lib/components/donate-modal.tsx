/* eslint-disable camelcase */
import Link from 'next/link';
import { useRef, useState } from 'react';

import { Modal } from '@mantine/core';

import { GA_EVENT_ACTION, lato, roboto } from '@jobstash/shared/core';
import { gaEvent } from '@jobstash/shared/utils';

import { useMediaQuery } from '@jobstash/shared/state';

import LinkButton from '../base/button/link-button';
import Heading from '../base/heading';
import Text from '../base/text';

import { FoxSVG } from './fox-svg';

const LS_KEY = 'donate-modal-ms';
const GITCOIN_LINK =
  'https://explorer.gitcoin.co/#/round/424/0x98720dd1925d34a2453ebc1f91c9d48e7e89ec29/0x98720dd1925d34a2453ebc1f91c9d48e7e89ec29-167';

const gaEventDonate = (element: string) =>
  gaEvent(GA_EVENT_ACTION.DONATE_CLICK, {
    donate_click_element: element,
  });

const onClickGitcoinGrants = () => gaEventDonate('gitcoin-grant-19');
const onClickDonate = () => gaEventDonate('donate-modal');
const onClickLayerswap = () => gaEventDonate('layerswap-link');
const onClickPassport = () => gaEventDonate('gitcoin-passport-link');
const onClickDM = () => gaEventDonate('telegram-dm');

const DonateModal = () => {
  const [show, setShow] = useState(initFromLocalStorage());

  const closedRef = useRef(false);
  const closeModal = () => {
    if (!closedRef.current) {
      closedRef.current = true;
      setShow(false);
      localStorage.setItem(LS_KEY, String(Date.now()));
    }
  };

  const isMobile = useMediaQuery('(max-width: 667px)');

  return (
    <Modal.Root
      // Centered
      opened={show}
      // Opened
      fullScreen={isMobile}
      centered={!isMobile}
      lockScroll={false}
      size="auto"
      onClose={closeModal}
    >
      <Modal.Overlay opacity={0.85} blur={0.5} />
      <Modal.Content className="md:rounded-3xl">
        <Modal.Header>
          <div className="absolute top-4 right-4 sm:right-10 sm:top-10">
            <Modal.CloseButton iconSize={32} />
          </div>
        </Modal.Header>

        <Modal.Body className="flex">
          <div className="flex flex-col flex-wrap flex-auto basis-1/2 gap-6 items-center p-1 sm:p-4">
            <FoxSVG isMobile={isMobile} />

            <div className="text-center space-y-1 sm:space-y-0">
              <h1
                className={`${lato.variable} font-lato antialiased font-black text-2xl sm:text-4xl text-white`}
              >
                We Need Your Support{' '}
                <span role="img" aria-label="Heart">
                  ❤️
                </span>
              </h1>

              <Heading fw="bold" className="text-white text-lg sm:text-xl">
                Gitcoin Grants Round 19 is Live!
              </Heading>
            </div>

            <div className="text-center space-y-4 sm:space-y-0">
              <Heading size="sm" fw="normal" className="text-white/80">
                We are a self-funded public good, and rely on community funding
                for our continued existence.
              </Heading>

              <p
                className={`${roboto.variable} font-roboto antialiased text-lg text-white/80 pt-1`}
              >
                Please support us on{' '}
                <Link
                  href={GITCOIN_LINK}
                  className="text-blue-400"
                  rel="noopener noreferrer"
                  target="_blank"
                  onClick={onClickGitcoinGrants}
                >
                  Gitcoin Grants 19
                </Link>
              </p>
            </div>

            <LinkButton
              external
              variant="primary"
              className="sm:px-8 py-3"
              linkProps={{ href: GITCOIN_LINK }}
              onClick={onClickDonate}
            >
              <Heading size="label" className="cursor-pointer text-md">
                Donate Now
              </Heading>
            </LinkButton>

            <div className="flex flex-col max-w-2xl gap-4 text-center">
              <div className="flex flex-col space-y-4 sm:space-y-0">
                <Text size="lg" className="text-white/80 items-center">
                  GG19 is held on PGN, which is an own L2 created by GitCoin.
                </Text>
                <p
                  className={`${roboto.variable} font-roboto antialiased text-lg text-white/80 pt-1`}
                >
                  We recommend using{' '}
                  <Link
                    href="https://www.layerswap.io/app"
                    className="text-blue-400"
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={onClickLayerswap}
                  >
                    layerswap.io
                  </Link>{' '}
                  to bridge tokens from any L2 to PGN cheaply.
                </p>
              </div>

              <p
                className={`${roboto.variable} font-roboto antialiased text-lg text-white/80 pt-1`}
              >
                You need a Gitcoin passport score of at least 25 for the
                donation to count as 100% matched. You can set that up at{' '}
                <Link
                  href="https://passport.gitcoin.co/"
                  className="text-blue-400"
                  rel="noopener noreferrer"
                  target="_blank"
                  onClick={onClickPassport}
                >
                  passport.gitcoin.co
                </Link>
              </p>
            </div>

            <p
              className={`${roboto.variable} font-roboto antialiased text-lg text-white/80 pt-1`}
            >
              If you need support, you can reach out to us at{' '}
              <Link
                href="https://telegram.me/duckdegen"
                className="text-blue-400"
                rel="noopener noreferrer"
                target="_blank"
                onClick={onClickDM}
              >
                @jobstashxyz
              </Link>{' '}
              on telegram.
            </p>

            <Text size="lg" className="text-white/80">
              Thank you for your support!
            </Text>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default DonateModal;

const SHOW_MODAL_INTERVAL = 3_600_000;

const initFromLocalStorage = (): boolean => {
  if (typeof localStorage === 'undefined') {
    return false;
  }

  const nowTs = Date.now();

  const rawTs = localStorage.getItem(LS_KEY);

  if (!rawTs) {
    localStorage.setItem(LS_KEY, nowTs.toString());
    return true;
  }

  const storedTs = Number(rawTs ?? nowTs);
  const diff = nowTs - storedTs;
  const isPastHour = diff > SHOW_MODAL_INTERVAL;

  return isPastHour;
};
