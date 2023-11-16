/* eslint-disable camelcase */
import Link from 'next/link';
import { useRef, useState } from 'react';

import { Modal } from '@mantine/core';

import { GA_EVENT_ACTION, lato, roboto } from '@jobstash/shared/core';
import { gaEvent } from '@jobstash/shared/utils';

import { useIsMobile } from '@jobstash/shared/state';

import LinkButton from '../base/button/link-button';
import Heading from '../base/heading';
import Text from '../base/text';

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

  const isMobile = useIsMobile('(max-width: 667px)');

  return (
    <Modal.Root
      centered
      opened={show}
      fullScreen={isMobile}
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

const FoxSVG = ({ isMobile }: { isMobile: boolean }) => (
  <svg
    width={isMobile ? '83' : '113'}
    height={isMobile ? '103' : '133'}
    viewBox="0 0 133 153"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M78.9467 99.0021C78.9687 98.951 78.983 98.8969 78.9883 98.8417C79.0596 97.6949 80.712 83.6369 81.1637 78.1647C81.4312 74.9146 83.9395 62.8233 93.4614 56.4597C100.124 52.0094 108.975 50.4111 120.303 56.3469C120.404 56.4003 120.484 56.4871 120.529 56.5923C120.573 56.6968 120.581 56.8145 120.549 56.9244C120.518 57.0343 120.45 57.13 120.357 57.1959C120.264 57.2613 120.15 57.2934 120.036 57.2856H119.78C119.66 57.2821 119.543 57.3219 119.449 57.3979C119.356 57.4746 119.293 57.5815 119.273 57.7004C119.253 57.8192 119.276 57.941 119.339 58.0438C119.402 58.1466 119.499 58.2232 119.614 58.2601C121.849 58.8875 123.979 59.8447 125.932 61.1002C126.015 61.1572 126.079 61.238 126.115 61.3325C126.151 61.4264 126.157 61.5298 126.132 61.6272C126.107 61.7253 126.053 61.8126 125.977 61.8792C125.901 61.9451 125.807 61.9867 125.706 61.9974C124.646 62.1281 123.597 62.3266 122.562 62.5915C122.459 62.6219 122.369 62.6854 122.305 62.7716C122.24 62.8577 122.205 62.9623 122.205 63.0698C122.205 63.1774 122.24 63.282 122.305 63.3681C122.369 63.4543 122.459 63.5173 122.562 63.5481C124.511 64.1286 126.389 64.926 128.161 65.9248C128.625 66.1922 128.381 66.4596 127.852 66.4001C126.336 66.2338 124.196 66.4833 122.223 66.4774C122.107 66.475 121.993 66.5142 121.902 66.5879C121.811 66.6616 121.75 66.765 121.729 66.8803C121.707 66.9949 121.727 67.1138 121.785 67.2148C121.843 67.3164 121.935 67.3942 122.045 67.434C122.693 67.6895 123.4 67.9925 124.048 68.3193C124.144 68.3651 124.221 68.4411 124.271 68.535C124.32 68.6289 124.337 68.7358 124.321 68.841C124.304 68.9456 124.254 69.0418 124.178 69.1161C124.103 69.1904 124.004 69.2379 123.899 69.2522C120.707 69.6919 115.531 71.4387 112.897 78.3489C111.78 81.1854 110.888 84.1063 110.229 87.0831C110.207 87.1984 110.227 87.3178 110.285 87.42C110.342 87.5222 110.434 87.6012 110.545 87.6422C110.655 87.6832 110.775 87.6844 110.887 87.6452C110.997 87.606 111.091 87.5287 111.15 87.4277L111.192 87.3564C111.25 87.2548 111.344 87.177 111.455 87.1378C111.565 87.0992 111.687 87.1009 111.796 87.1431C111.906 87.1853 111.997 87.2655 112.053 87.3689C112.109 87.4723 112.126 87.5917 112.101 87.707C111.869 88.8953 111.602 90.458 111.465 91.9077C111.215 94.6409 109.355 125.811 77.3597 123.993C77.2557 123.984 77.1559 123.945 77.0744 123.88L71.7785 119.673C71.7025 119.608 71.6466 119.522 71.6181 119.427C71.5895 119.33 71.5895 119.228 71.6181 119.132L75.1011 107.909V107.855L78.9467 99.0021Z"
      fill="#D68800"
    />
    <path
      d="M131.246 62.6814C131.246 62.6814 125.766 62.0576 123.186 63.0855C123.186 63.0855 128.857 64.3986 132.102 67.0545C132.102 67.0545 125.665 66.0801 121.938 66.5435C121.938 66.5435 125.814 67.7318 127.621 69.0568C127.621 69.0568 121.558 69.241 116.969 72.8179C116.969 72.8179 112.553 71.2196 109.551 72.1524C109.551 72.1524 111.673 66.5376 114.39 64.4283C114.39 64.4283 108.25 64.7966 105.878 66.1038C105.997 65.8483 108.054 61.7664 109.718 60.685C109.718 60.685 103.418 60.893 101.272 62.5982C101.272 62.5982 102.877 58.2073 104.571 56.9715C104.571 56.9715 97.1647 57.2032 94.4009 59.5026C94.5257 59.2768 96.713 55.6584 98.2821 54.0601C105.415 51.4754 115.067 51.6834 124.738 57.5894C127.096 59.0315 129.28 60.7397 131.246 62.6814Z"
      fill="white"
    />
    <path
      opacity="0.2"
      d="M104.753 92.5676C105.051 87.541 105.49 86.626 106.816 82.3955C108.29 77.6719 109.74 74.2376 111.963 72.0273C112.013 71.978 112.073 71.94 112.139 71.9156C112.204 71.8906 112.274 71.8805 112.344 71.8847C113.607 71.9655 114.857 72.1871 116.07 72.5442C116.155 72.5686 116.233 72.6155 116.293 72.6797C116.354 72.7439 116.396 72.8235 116.416 72.9096C116.435 72.9958 116.431 73.0855 116.404 73.1699C116.376 73.2536 116.327 73.3291 116.261 73.3879C114.748 74.72 113.587 76.4033 112.879 78.2898C111.755 81.1287 110.863 84.0532 110.21 87.0359C110.185 87.1512 110.204 87.2718 110.261 87.3758C110.318 87.4792 110.411 87.5588 110.521 87.5998C110.632 87.6408 110.754 87.6408 110.865 87.5992C110.976 87.5582 111.068 87.478 111.125 87.3746C111.141 87.352 111.155 87.3283 111.167 87.3033C111.23 87.2077 111.324 87.1363 111.433 87.1019C111.542 87.0674 111.659 87.0716 111.766 87.1132C111.872 87.1548 111.961 87.232 112.018 87.3313C112.074 87.4311 112.095 87.5469 112.076 87.6598C111.85 88.8481 111.577 90.4049 111.446 91.8546C111.191 94.5819 109.33 125.758 77.3349 123.94C77.2315 123.934 77.1317 123.896 77.0497 123.833L71.7597 119.62C71.6807 119.558 71.623 119.474 71.5939 119.378C71.5653 119.282 71.5671 119.18 71.5992 119.085L75.0823 107.844V107.802L78.8387 99.1035C79.0111 98.6519 79.3855 98.2241 79.4985 98.6994C81.9414 109.002 88.8064 110.137 92.5747 109.935C92.5747 109.935 95.4753 109.905 99.5764 105.776C101.272 104.064 102.604 102.027 103.492 99.7879C104.38 97.5491 104.808 95.1534 104.748 92.7459C104.759 92.6686 104.753 92.6152 104.753 92.5676Z"
      fill="black"
    />
    <path
      opacity="0.1"
      d="M112.126 71.8731C113.766 71.964 115.387 72.2819 116.94 72.8178C117.214 72.598 117.493 72.3959 117.778 72.2236H117.814C118.102 72.0192 118.404 71.8344 118.718 71.671C119.3 71.3217 119.908 71.0157 120.536 70.756C121.131 70.4946 121.725 70.2748 122.32 70.0965C122.617 69.9896 122.914 69.9064 123.169 69.8351C123.425 69.7638 123.764 69.6806 124.061 69.6152C124.358 69.5499 124.525 69.5023 124.739 69.4607C125.606 69.3003 126.332 69.1993 126.831 69.1458H127.182C127.443 69.1458 127.592 69.1458 127.592 69.1458C125.809 67.8446 121.909 66.6266 121.909 66.6266C125.636 66.1631 132.073 67.1376 132.073 67.1376C131.635 66.7858 131.177 66.4602 130.7 66.1631C130.278 66.0443 123.698 64.2202 117.368 65.4145C117.853 66.4816 118.733 67.3188 119.823 67.7495C116.921 68.374 114.253 69.8036 112.126 71.8731Z"
      fill="black"
    />
    <path
      d="M72.7092 87.369C69.4579 78.5516 67.2789 69.3753 66.2186 60.0374H56.6372C52.4766 56.8229 49.267 56.7695 45.1955 60.0374H38.4672C36.8565 67.1377 30.3778 86.7036 30.3778 86.7036C21.1293 115.954 18.4011 144.534 50.8837 140.523C83.0097 144.064 84.1331 121.302 72.7092 87.369Z"
      fill="#D68800"
    />
    <path
      d="M66.1659 93.0012C62.7363 87.0239 62.1413 77.7193 62.1413 77.7193C61.856 70.411 63.5798 65.7587 63.5798 65.7587C56.6969 57.4404 51.5377 57.1195 51.5377 57.1195C51.5377 57.1195 46.3785 56.1273 39.2163 65.0932C40.2725 69.2144 40.7094 73.4692 40.512 77.7193C40.512 77.7193 40.3575 87.0239 36.9458 93.0012C36.9458 93.0012 21.0647 125.003 42.2482 138.901C42.2482 138.901 47.8353 140.511 51.5621 140.178C55.2888 140.511 60.8813 138.568 60.8813 138.568C82.041 124.67 66.1659 93.0012 66.1659 93.0012Z"
      fill="white"
    />
    <path
      d="M32.1365 107.701C32.1365 107.701 30.7277 109.294 30.7277 110.624C30.7277 110.624 31.9165 109.537 31.7263 110.078C31.7263 110.078 30.3057 111.955 30.7277 112.841L31.4351 112.395L32.1365 107.701Z"
      fill="white"
    />
    <path
      d="M70.5283 105.354C70.5283 105.354 71.9846 106.893 72.0262 108.224C72.0262 108.224 70.8374 107.179 71.0038 107.713C71.0038 107.713 72.4838 109.543 72.0856 110.441L71.3604 110.019L70.5283 105.354Z"
      fill="white"
    />
    <path
      opacity="0.2"
      d="M31.876 85.8838L38.4379 92.8653L49.9866 77.7734L50.8722 79.9956L38.4379 98.1949L31.876 85.8838Z"
      fill="black"
    />
    <path
      opacity="0.2"
      d="M24.6968 124.273V121.302C24.6968 121.302 40.1505 133.185 53.8212 133.185C62.7368 133.185 79.3793 121.896 79.3793 121.896L78.7849 124.273L53.5359 143.024L24.6968 124.273Z"
      fill="black"
    />
    <path
      d="M31.7103 85.7173L38.4386 95.9727L50.1003 77.8506C50.1003 77.8506 52.0201 77.8506 50.9681 83.1565C50.6085 84.9099 50.0539 86.6181 49.3157 88.2485L41.0777 106.715C40.7995 107.415 40.3174 108.016 39.6945 108.439C39.0716 108.863 38.3358 109.091 37.5827 109.092C37.0288 109.092 36.4814 108.971 35.9803 108.736C35.4787 108.501 35.0352 108.157 34.6822 107.731L27.627 97.7968L31.7103 85.7173Z"
      fill="#D68800"
    />
    <path
      opacity="0.2"
      d="M40.0068 67.9756C40.0068 67.9756 43.8168 70.3047 46.4677 71.903C48.976 73.4181 52.3461 73.5726 55.2347 73.0913C57.5766 72.7111 63.336 70.2512 66.4862 63.959L40.0068 67.9756Z"
      fill="black"
    />
    <path
      d="M46.8913 143.107L89.2583 117.796C92.1113 116.075 95.5212 115.53 98.7683 116.275C100.123 116.613 101.372 117.285 102.401 118.23C103.43 119.174 104.206 120.361 104.659 121.682C105.096 122.89 105.282 124.174 105.205 125.456C105.129 126.738 104.791 127.991 104.213 129.138C102.963 131.614 101.025 133.677 98.6316 135.08C93.205 138.205 82.1318 143.511 66.7018 145.448C61.4511 146.097 56.3032 147.405 51.3788 149.34C50.2982 149.751 49.2438 150.229 48.2227 150.772C45.5938 152.298 42.5559 152.973 39.527 152.703C36.9515 152.422 34.4284 151.78 32.0319 150.796C30.9038 150.342 29.8791 149.663 29.0208 148.801C28.1625 147.939 27.4885 146.912 27.0391 145.781C26.3972 144.165 26.3081 142.549 28.1744 142.121C28.7504 141.998 29.3477 142.024 29.91 142.198C32.5134 142.965 42.5702 145.591 46.8913 143.107Z"
      fill="#D68800"
    />
    <path
      opacity="0.2"
      d="M103.404 119.364C103.792 121.971 103.343 124.633 102.124 126.97C100.905 129.306 98.9766 131.197 96.6163 132.371C96.6163 132.371 79.748 141.669 63.3313 143.458L63.1411 146.025C64.3299 145.807 65.5186 145.62 66.7074 145.466C82.1611 143.529 93.2106 138.223 98.6372 135.098C101.03 133.695 102.968 131.632 104.218 129.156C104.796 128.009 105.134 126.756 105.211 125.474C105.288 124.192 105.102 122.907 104.664 121.699C104.362 120.863 103.938 120.076 103.404 119.364Z"
      fill="black"
    />
    <path
      d="M56.716 137.237L46.891 143.108C42.5699 145.591 32.5131 142.965 29.9038 142.216C29.3415 142.043 28.7442 142.016 28.1682 142.139C26.3019 142.567 26.3851 144.183 27.0329 145.799C27.4823 146.93 28.1563 147.957 29.0146 148.819C29.8729 149.682 30.897 150.36 32.0257 150.814C34.4222 151.799 36.9453 152.44 39.5208 152.721C42.5491 152.991 45.587 152.317 48.2165 150.79C49.2376 150.247 50.2914 149.769 51.3726 149.358C56.2964 147.423 61.4449 146.116 66.6956 145.466C67.2483 145.401 67.7952 145.324 68.3361 145.247C63.8664 145.942 56.716 137.237 56.716 137.237Z"
      fill="#21252B"
    />
    <path
      opacity="0.3"
      d="M37.6294 145.484C37.6294 145.484 48.0191 148.681 49.6714 150.071L52.6433 148.883L39.7216 144.724L37.6294 145.484Z"
      fill="black"
    />
    <path
      opacity="0.3"
      d="M54.3757 138.634C54.3757 138.634 58.4294 143.001 63.2913 143.458L65.9542 145.241L59.737 145.687L52.6045 140.803V139.674L54.3757 138.634Z"
      fill="black"
    />
    <path
      d="M58.3573 143.107L15.9843 117.796C13.1313 116.075 9.72138 115.53 6.4743 116.275C5.11913 116.613 3.87037 117.285 2.8421 118.23C1.81324 119.174 1.03698 120.361 0.584064 121.682C0.148982 122.89 -0.0346865 124.175 0.0425823 125.456C0.120445 126.739 0.458063 127.991 1.0358 129.138C2.28398 131.615 4.22221 133.679 6.61695 135.08C12.0376 138.205 23.1168 143.511 38.5468 145.448C43.7975 146.099 48.9454 147.406 53.8698 149.34C54.9491 149.749 56.0018 150.228 57.02 150.772C59.6453 152.303 62.6814 152.984 65.7097 152.721C68.2852 152.44 70.8083 151.798 73.2048 150.814C74.3341 150.36 75.3594 149.681 76.2189 148.819C77.0777 147.957 77.7529 146.93 78.2035 145.799C78.8395 144.183 78.9346 142.567 77.0623 142.139C76.4887 142.016 75.8932 142.043 75.3327 142.216C72.7293 142.965 62.6725 145.591 58.3573 143.107Z"
      fill="#D68800"
    />
    <path
      opacity="0.2"
      d="M11.6921 134.338C-2.26981 127.683 3.11523 117.998 3.11523 117.998L2.18801 118.925C1.49378 119.743 0.952302 120.679 0.589139 121.688C0.154057 122.896 -0.0302058 124.181 0.0476573 125.463C0.12552 126.745 0.463138 127.998 1.04087 129.145C2.28906 131.622 4.22732 133.685 6.62206 135.086C12.0428 138.212 23.1219 143.518 38.5519 145.455C38.9323 145.502 39.3126 145.561 39.6871 145.615L45.5477 144.118C25.2557 140.725 14.5926 135.758 12.5896 134.76L11.6921 134.338Z"
      fill="black"
    />
    <path
      d="M48.5329 137.237L58.3579 143.108C62.6731 145.591 72.7299 142.965 75.3392 142.216C75.9021 142.043 76.4994 142.016 77.0748 142.139C78.947 142.567 78.8579 144.183 78.216 145.799C77.766 146.93 77.0908 147.957 76.2313 148.819C75.3725 149.682 74.3466 150.36 73.2173 150.814C70.8178 151.8 68.2905 152.442 65.7103 152.721C62.682 152.991 59.6441 152.317 57.0146 150.79C55.9964 150.246 54.9444 149.768 53.8644 149.358C48.94 147.425 43.7922 146.117 38.5414 145.466C37.9827 145.401 37.4418 145.324 36.895 145.247C41.3766 145.942 48.5329 137.237 48.5329 137.237Z"
      fill="#21252B"
    />
    <path
      d="M72.3123 40.5306C78.6423 34.28 83.3141 22.8601 83.2488 14.0308C83.2488 12.5038 83.5578 10.9233 83.0289 9.49733C82.2918 7.53658 80.0035 6.5265 77.9172 6.63939C75.8309 6.75228 73.9111 7.77423 72.1161 8.84373C68.4477 11.0374 64.9795 13.5483 61.7502 16.3481C59.3377 18.4443 57.3411 20.976 55.8659 23.8108C55.4564 24.5042 55.2501 25.2992 55.2715 26.1043C55.3797 26.812 55.6662 27.4804 56.1037 28.0472C59.7115 33.2996 67.373 36.6686 72.3123 40.5306Z"
      fill="#D68800"
    />
    <path
      d="M55.1546 35.2128C54.5008 31.2081 56.2007 27.0668 58.9467 24.0781C61.6927 21.0894 65.3897 19.1346 69.1878 17.6968C70.8699 17.0551 72.9799 16.5797 74.3054 17.7978C74.8468 18.3676 75.2284 19.071 75.4109 19.8357C76.0261 21.8357 76.2519 23.9355 76.0766 26.021C75.7598 29.0537 74.7095 31.9639 73.0156 34.4998C72.319 35.6768 71.3763 36.6905 70.2517 37.4706C68.112 38.8372 65.4016 38.8016 62.8636 38.7124C61.3492 38.7439 59.8395 38.5294 58.3939 38.0767C56.9793 37.5241 55.3983 36.7041 55.1546 35.2128Z"
      fill="white"
    />
    <path
      d="M25.9202 41.8021C25.5344 41.8359 25.1469 41.7599 24.8028 41.5822C24.0027 41.0701 23.3507 40.357 22.9127 39.5145C18.6034 32.6281 12.2793 20.5547 15.0967 12.1828C15.3932 11.1573 16.0607 10.278 16.9689 9.71707C18.0388 9.12291 19.3464 9.21201 20.5352 9.43185C23.3989 9.94877 26.1003 11.1312 28.4225 12.884C33.017 16.3539 38.1227 18.6771 43.2819 21.238C44.6014 21.8916 46.0755 22.9611 45.9387 24.4286C45.8252 25.09 45.531 25.7067 45.0888 26.2111C42.0396 30.3109 38.0098 33.5669 34.0215 36.7695C32.5713 37.9637 28.5473 41.6832 25.9202 41.8021Z"
      fill="#D68800"
    />
    <path
      d="M21.8482 30.6255C21.0945 27.9208 20.8924 25.092 21.2538 22.3071C21.3049 21.4658 21.5843 20.6548 22.0622 19.9602C22.9419 18.855 24.5467 18.6471 25.9553 18.8134C29.1412 19.1878 31.9764 20.9703 34.5678 22.8657C37.3626 24.9108 40.0212 27.1353 42.5265 29.5262C43.5786 30.5244 44.5949 31.689 44.6425 33.1388C44.6092 34.5963 44.1706 36.0158 43.3765 37.2386C42.8356 38.1833 42.1877 39.0745 41.5933 39.9658C40.9265 41.04 40.0587 41.9764 39.0375 42.7227C38.2334 43.1856 37.337 43.4654 36.4122 43.5415C35.4873 43.6175 34.5571 43.488 33.6882 43.1624C31.955 42.491 30.4042 41.4227 29.159 40.043C26.1812 36.9771 22.9953 34.7371 21.8482 30.6255Z"
      fill="white"
    />
    <path
      d="M80.9296 42.711C81.8485 42.4638 82.8162 42.4638 83.7351 42.711C81.3279 39.9006 77.1316 37.0724 77.1316 37.0724C76.8879 36.7694 76.6192 36.4877 76.3292 36.2287C71.9736 32.3803 67.3696 28.8236 62.5456 25.5812C58.9794 23.2046 55.0981 20.917 50.8305 20.917C45.7546 20.917 41.3205 24.1255 37.249 27.1854C35.5301 28.4415 33.8754 29.7843 32.292 31.208C29.0063 34.3452 26.3161 38.051 24.3511 42.1466V41.8673C24.3511 41.8673 21.3792 45.4977 18.9482 48.3081C19.8689 48.0615 20.8389 48.0615 21.7596 48.3081C20.8033 48.5648 19.9575 49.1286 19.3524 49.9123C19.3524 49.9123 21.403 49.9123 23.7151 53.5368C23.7686 53.6318 23.8281 53.7328 23.8934 53.8279L23.9529 53.9229C24.048 54.0655 24.1431 54.2082 24.2501 54.3448C27.0198 57.9752 30.6574 60.6667 34.5922 62.9899C40.4706 66.4599 46.6699 70.0368 53.4993 70.2804C54.7118 70.3778 55.9309 70.2013 57.0655 69.7634C57.8976 69.3475 58.6661 68.8151 59.3479 68.1829L70.1893 59.0863C73.1612 56.5908 76.1687 54.0596 78.362 50.863C79.0425 49.9082 79.5888 48.8648 79.9846 47.7614C81.845 43.6023 83.3369 44.3034 83.3369 44.3034C82.73 43.5238 81.8848 42.9647 80.9296 42.711Z"
      fill="#D68800"
    />
    <path
      d="M24.4668 54.6361C24.2529 54.3568 29.1089 53.317 29.6082 53.317C31.9607 53.3259 34.3079 53.5446 36.6218 53.9706C38.4994 54.2754 40.2903 54.9765 41.8761 56.0264C43.6889 57.2979 43.3798 58.8071 44.5983 60.4648C46.5407 58.6508 49.021 57.5184 51.6642 57.2385C54.308 56.9587 56.9702 57.5469 59.2497 58.9141C59.844 59.2765 60.6227 59.6687 61.0922 59.1815C61.283 58.9266 61.3906 58.6199 61.4013 58.3021C61.626 56.9759 62.2132 55.7377 63.0971 54.7234C63.9815 53.7098 65.1286 52.9599 66.4119 52.5565C70.6201 51.3087 73.3126 46.2643 77.705 46.0206C77.9832 45.9826 78.2655 45.9999 78.5371 46.0712C78.8082 46.1425 79.0632 46.2666 79.2861 46.4366C80.0944 47.1852 79.6486 48.5161 79.1137 49.4728C74.9828 56.9058 68.7002 62.99 61.6747 67.785C59.9992 69.0274 58.1406 70.0018 56.1649 70.6726C51.6417 72.0154 46.7856 70.5122 42.4348 68.6822C35.3059 65.6745 29.1047 60.8273 24.4668 54.6361Z"
      fill="white"
    />
    <path
      d="M50.327 54.1605C51.1888 53.9121 52.081 53.7861 52.9779 53.7861C53.8807 53.7897 54.7562 54.0975 55.4624 54.6596C56.0246 55.1747 56.3831 55.8746 56.4716 56.6316C56.5596 57.3892 56.3724 58.1527 55.9438 58.7831C55.3815 59.4468 54.6843 59.9833 53.8992 60.3576C53.4522 60.6791 52.9095 60.8383 52.3597 60.8092C52.0739 60.7367 51.8034 60.6119 51.5633 60.4408L49.7445 59.3119C49.2779 59.0736 48.8713 58.732 48.5557 58.3137C48.3929 58.0255 48.293 57.7059 48.2633 57.3755C48.2336 57.0457 48.2746 56.7136 48.3834 56.4005C48.7222 55.3488 49.2155 54.4457 50.327 54.1605Z"
      fill="#21252B"
    />
    <path
      d="M55.8073 63.0081C55.4798 63.1311 55.1309 63.1875 54.7808 63.1756C54.4313 63.1631 54.0871 63.0823 53.7686 62.9368C53.4648 62.8352 53.1944 62.6534 52.9852 62.4109C52.776 62.1679 52.6357 61.8738 52.5798 61.5583C52.5923 60.7633 52.5412 59.9683 52.4253 59.1816C52.31 59.9683 52.2582 60.7633 52.2707 61.5583C52.2149 61.8738 52.0752 62.1679 51.866 62.4109C51.6568 62.6534 51.3857 62.8352 51.082 62.9368C50.7634 63.0823 50.4198 63.1631 50.0698 63.1756C49.7203 63.1875 49.3714 63.1311 49.0433 63.0081C48.3586 62.7466 47.757 62.3052 47.3018 61.7306C47.6572 62.4145 48.2302 62.9599 48.9303 63.2814C49.2929 63.446 49.6858 63.5309 50.0834 63.5309C50.4811 63.5309 50.8745 63.446 51.2365 63.2814C51.605 63.1132 51.926 62.856 52.1697 62.5327C52.1406 62.4864 52.1239 62.4323 52.1221 62.3771C52.1209 62.3218 52.134 62.2671 52.1608 62.219C52.1875 62.1703 52.2267 62.1299 52.2743 62.102C52.3218 62.074 52.3759 62.0592 52.4312 62.0592C52.4865 62.0592 52.5406 62.074 52.5887 62.102C52.6363 62.1299 52.6755 62.1703 52.7017 62.219C52.7284 62.2671 52.7421 62.3218 52.7403 62.3771C52.7385 62.4323 52.7225 62.4864 52.6927 62.5327C52.937 62.856 53.2574 63.1132 53.6259 63.2814C53.9879 63.446 54.3814 63.5309 54.779 63.5309C55.1766 63.5309 55.5701 63.446 55.9321 63.2814C56.6323 62.9599 57.2052 62.4145 57.5607 61.7306C57.1024 62.3069 56.4961 62.7484 55.8073 63.0081Z"
      stroke="#21252B"
      strokeWidth="0.59"
      strokeMiterlimit="10"
    />
    <path
      d="M56.3828 47.9573C56.7098 46.8819 58.1303 44.838 64.3475 45.8421C64.4075 45.8421 64.4652 45.8659 64.5074 45.9081C64.5496 45.9508 64.5734 46.0079 64.5734 46.0679C64.5734 46.1279 64.5496 46.1849 64.5074 46.2277C64.4652 46.2699 64.4075 46.2937 64.3475 46.2937C62.2256 46.6323 58.1957 47.3572 56.7216 48.2188C56.6818 48.2413 56.6366 48.252 56.5909 48.2485C56.5451 48.2455 56.5017 48.2288 56.4655 48.2009C56.4292 48.173 56.4019 48.135 56.387 48.0916C56.3728 48.0482 56.371 48.0013 56.3828 47.9573Z"
      fill="#21252B"
    />
    <path
      d="M46.1496 48.3079C45.8227 47.2325 44.4021 45.1885 38.1849 46.1927C38.1249 46.1927 38.0673 46.2164 38.0251 46.2586C37.9829 46.3008 37.9585 46.3584 37.9585 46.4184C37.9585 46.4784 37.9829 46.5355 38.0251 46.5783C38.0673 46.6205 38.1249 46.6442 38.1849 46.6442C40.3069 46.9829 44.3367 47.7078 45.8108 48.5693C45.85 48.5919 45.8958 48.6026 45.9415 48.5991C45.9873 48.5961 46.0307 48.5794 46.0669 48.5515C46.1032 48.5236 46.1306 48.4855 46.1448 48.4422C46.1597 48.3988 46.1615 48.3519 46.1496 48.3079Z"
      fill="#21252B"
    />
    <path
      d="M45.9824 21.8738L50.8509 19.0515C50.9104 19.0153 50.9799 19.0004 51.0489 19.0094C51.1178 19.0183 51.1814 19.0498 51.2301 19.0991C51.2789 19.1484 51.3098 19.2126 51.3175 19.2815C51.3253 19.3504 51.3092 19.4199 51.273 19.4794L50.5116 20.7449L55.3735 19.5566C55.4312 19.5417 55.4918 19.5441 55.5483 19.5631C55.6042 19.5821 55.6535 19.6172 55.6909 19.6635C55.7278 19.7099 55.7504 19.7657 55.7563 19.8246C55.7622 19.884 55.7516 19.9434 55.7248 19.9963L55.0591 22.4383L45.9824 21.8738Z"
      fill="#D68800"
    />
    <path
      d="M50.1014 77.8506L41.376 91.4154C41.376 91.4154 44.3954 90.7024 45.8576 96.0024L49.3168 88.2782C50.0556 86.6478 50.6102 84.9396 50.9698 83.1862C52.0397 77.8506 50.1014 77.8506 50.1014 77.8506Z"
      fill="#21252B"
    />
    <path
      opacity="0.4"
      d="M41.7548 39.5329C43.0743 39.4973 45.5766 39.6933 46.5098 41.6006C46.5365 41.6535 46.5478 41.7129 46.5413 41.7717C46.5354 41.8311 46.5128 41.887 46.4759 41.9333C46.4385 41.9797 46.3891 42.0142 46.3332 42.0332C46.2768 42.0522 46.2162 42.0545 46.1591 42.0403C44.5519 41.6261 43.0166 40.9708 41.6062 40.0974C41.5527 40.0617 41.5117 40.01 41.4891 39.95C41.4665 39.89 41.463 39.8246 41.4796 39.7622C41.4957 39.7005 41.5313 39.6446 41.5806 39.6036C41.63 39.5626 41.6906 39.5377 41.7548 39.5329Z"
      fill="white"
    />
    <path
      opacity="0.4"
      d="M60.2697 39.5269C58.9443 39.4913 56.4479 39.6992 55.5147 41.6124C55.4868 41.6647 55.4749 41.7248 55.4803 41.7836C55.4862 41.843 55.5094 41.8988 55.5462 41.9452C55.5837 41.9915 55.6342 42.026 55.6907 42.0438C55.7471 42.0616 55.8084 42.0628 55.8654 42.0462C57.4726 41.6291 59.0061 40.9678 60.4124 40.0854C60.4629 40.0492 60.5015 39.9987 60.5235 39.9399C60.5449 39.8816 60.5479 39.8181 60.5324 39.7574C60.517 39.6968 60.4837 39.6428 60.4367 39.6012C60.3898 39.5602 60.3315 39.5346 60.2697 39.5269Z"
      fill="white"
    />
    <path
      opacity="0.2"
      d="M41.0778 106.715L49.3158 88.2482C50.0546 86.6178 50.6086 84.9096 50.9682 83.1562C51.0514 82.7284 51.1109 82.3422 51.1584 81.9679L50.8731 79.9834L41.3393 102.288C38.3674 111.795 33.0181 105.259 33.0181 105.259L34.6823 107.719C35.0996 108.221 35.6398 108.606 36.2503 108.836C36.8607 109.066 37.5204 109.134 38.1653 109.033C38.8102 108.932 39.4171 108.665 39.9277 108.259C40.4382 107.852 40.8347 107.32 41.0778 106.715Z"
      fill="black"
    />
    <path
      opacity="0.2"
      d="M70.8068 85.8838L64.2449 92.8653L52.6962 77.7734L51.8105 79.9956L64.2449 98.1949L70.8068 85.8838Z"
      fill="black"
    />
    <path
      d="M70.9751 85.7173L64.2468 95.9727L52.5852 77.8506C52.5852 77.8506 50.6654 77.8506 51.7174 83.1565C52.077 84.9099 52.6309 86.6181 53.3697 88.2485L61.6078 106.715C61.8859 107.415 62.3674 108.016 62.9903 108.439C63.6132 108.863 64.349 109.091 65.1027 109.092C65.6567 109.092 66.2035 108.971 66.7052 108.736C67.2062 108.501 67.6496 108.157 68.0033 107.731L75.0585 97.7968L70.9751 85.7173Z"
      fill="#D68800"
    />
    <path
      d="M52.5852 77.8506L61.3106 91.4154C61.3106 91.4154 58.2912 90.7024 56.829 96.0024L53.3697 88.2782C52.6309 86.6478 52.077 84.9396 51.7174 83.1862C50.6654 77.8506 52.5852 77.8506 52.5852 77.8506Z"
      fill="#21252B"
    />
    <path
      opacity="0.2"
      d="M61.608 106.715L53.3699 88.2482C52.6311 86.6178 52.0771 84.9096 51.7175 83.1562C51.6343 82.7284 51.5749 82.3422 51.5273 81.9679L51.8126 79.9834L61.3226 102.277C64.2945 111.783 69.8222 105.247 69.846 105.247L67.9796 107.707C67.5624 108.209 67.0221 108.594 66.4117 108.824C65.8013 109.054 65.1409 109.123 64.4966 109.021C63.8517 108.92 63.2443 108.653 62.7337 108.247C62.2231 107.84 61.8273 107.309 61.5842 106.703L61.608 106.715Z"
      fill="black"
    />
    <path
      d="M64.944 7.733C60.5219 9.78287 50.6077 9.83635 48.1707 9.81258C43.9049 9.82506 39.6474 9.44719 35.4511 8.68368C31.2073 7.82214 29.3231 6.69916 29.3409 5.03549C29.3588 3.37183 31.2548 2.27856 35.5106 1.47049C43.9543 0.172832 52.5519 0.242929 60.9736 1.67844C65.2115 2.53998 67.0956 3.66296 67.0838 5.32663C67.0719 6.3486 66.2457 7.12695 64.944 7.733ZM31.9027 5.0533C33.1747 5.93267 38.6786 7.35867 48.1945 7.42997C57.7105 7.50127 63.2382 6.17033 64.522 5.31473C63.25 4.44131 57.7402 3.01531 48.2302 2.93807C38.7202 2.86082 33.1866 4.1977 31.9027 5.0533Z"
      fill="#D68800"
    />
    <path
      opacity="0.5"
      d="M64.944 7.733C60.5219 9.78287 50.6077 9.83635 48.1707 9.81258C43.9049 9.82506 39.6474 9.44719 35.4511 8.68368C31.2073 7.82214 29.3231 6.69916 29.3409 5.03549C29.3588 3.37183 31.2548 2.27856 35.5106 1.47049C43.9543 0.172832 52.5519 0.242929 60.9736 1.67844C65.2115 2.53998 67.0956 3.66296 67.0838 5.32663C67.0719 6.3486 66.2457 7.12695 64.944 7.733ZM31.9027 5.0533C33.1747 5.93267 38.6786 7.35867 48.1945 7.42997C57.7105 7.50127 63.2382 6.17033 64.522 5.31473C63.25 4.44131 57.7402 3.01531 48.2302 2.93807C38.7202 2.86082 33.1866 4.1977 31.9027 5.0533Z"
      fill="white"
    />
  </svg>
);
