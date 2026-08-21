/* eslint-disable react/iframe-missing-sandbox */
import Link from 'next/link';
import React, { useEffect } from 'react';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from '@heroui/modal';
import { ClassValue } from 'clsx';
import { useAtom } from 'jotai';

import {
  lato,
  NEW_FEATURE_DIFF,
  SUPPORT_TELEGRAM_URL,
} from '@jobstash/shared/core';
import { cn, getLocalStorageValue } from '@jobstash/shared/utils';

import { newFeatureIsOpenAtom } from '@jobstash/shared/state';

import LinkButton from '../base/button/link-button';
import Button from '../base/button/button';
import Text from '../base/text';

const LS_KEY = 'new-feature-key';

const TITLE = 'We need your support';

export const NewFeatureModal = () => {
  const [isOpenAtom, setIsOpenAtom] = useAtom(newFeatureIsOpenAtom);

  //
  // const current = JSON.stringify({ diff: NEW_FEATURE_DIFF });
  // const lastSeen = getLocalStorageValue(LS_KEY);
  // const defaultOpen = current !== lastSeen || lastSeen === '{}';

  const { isOpen, onClose, onOpen } = useDisclosure({
    defaultOpen: true,
  });

  // Need to sync atom because it's used in multiple places
  useEffect(() => {
    if (isOpen !== isOpenAtom) setIsOpenAtom(isOpen);
  }, [isOpen, isOpenAtom, setIsOpenAtom]);

  //
  // useEffect(() => {
  //   if (current !== lastSeen) {
  //     onOpen();
  //     localStorage.setItem(LS_KEY, current);
  //   }
  // }, [current, lastSeen, onOpen]);

  const handleClose = () => {
    onClose();
    //
    // localStorage.setItem(LS_KEY, current);
  };

  const onOpenChange = (isOpen: boolean) => {
    isOpen ? onOpen() : handleClose();
  };

  return (
    <Modal
      isDismissable
      hideCloseButton
      isOpen={isOpen}
      size="2xl"
      classNames={{
        base: 'px-1 md:px-4 pt-2 pb-4 flex flex-col m-4 md:pb-8',
      }}
      style={{
        zIndex: 9999,
      }}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="overflow-x-hidden md:gap-y-4">
        {() => (
          <>
            <ModalBody>
              <div className="flex flex-col w-full pt-0 sm:pt-4">
                <div
                  className={cn(
                    'font-bold text-white text-xl sm:text-3xl flex items-center justify-center space-x-2 md:space-x-4 pb-6 md:pb-8',
                    lato.className,
                  )}
                >
                  <span role="img" aria-label="Shimmer">
                    🔥
                  </span>
                  <span className="text-lg font-bold leading-tight text-center sm:text-3xl md:text-2xl lg:text-4xl">
                    {TITLE}
                  </span>
                  <span role="img" aria-label="Shimmer">
                    🔥
                  </span>
                </div>

                <div className="flex flex-col gap-4 max-w-fit">
                  <ContentText>
                    For 3 years, JobStash has provided the richest crypto job data completely for free, helping over <strong>150k users</strong> discover unique roles noone else is incentivized to cover.
                  </ContentText>

                  <ContentText>
                    We built this with grant money, but that funding is now exhausted.
                  </ContentText>

                  <ContentText className="font-bold">
                    To keep the lights on and our data operations running, we need your help.
                  </ContentText>

                  <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                    <LinkButton
                      linkProps={{ href: 'https://jobstash.xyz/donate' }}
                      variant="primary"
                      className="w-full font-bold sm:w-auto"
                      external
                    >
                      Donate to JobStash
                    </LinkButton>
                    <Button
                      variant="outline"
                      className="w-full font-bold sm:w-auto"
                      onClick={onClose}
                    >
                      Maybe later
                    </Button>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex items-center justify-center gap-4 p-0 pt-6 pb-2">
              <div>
                <span className="text-sm text-white/60">
                  Found a bug? Message us on{' '}
                  <Link
                    href={SUPPORT_TELEGRAM_URL}
                    className="text-indigo-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Telegram
                  </Link>
                </span>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const ContentText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) => <Text className={cn('text-sm sm:text-lg', className)}>{children}</Text>;


// export const ArcadeEmbed = () => (
//   <div
//     style={{
//       position: 'relative',
//       paddingBottom: 'calc(45.729166666666664% + 41px)',
//       height: 0,
//       width: '100%',
//     }}
//   >
//     <iframe
//       allowFullScreen
//       src="https://demo.arcade.software/Tk2J2EIYUrXTwfnzldFX?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=true"
//       title="JobStash"
//       frameBorder="0"
//       loading="lazy"
//       allow="clipboard-write"
//       style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         colorScheme: 'light',
//       }}
//     />
//   </div>
// );
