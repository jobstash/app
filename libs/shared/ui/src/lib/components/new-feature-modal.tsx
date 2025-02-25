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

import Text from '../base/text';

const LS_KEY = 'new-feature-key';

const TITLE = 'The New JobStash Experience';

export const NewFeatureModal = () => {
  const [isOpenAtom, setIsOpenAtom] = useAtom(newFeatureIsOpenAtom);

  const current = JSON.stringify({ diff: NEW_FEATURE_DIFF });
  const lastSeen = getLocalStorageValue(LS_KEY);
  const defaultOpen = current !== lastSeen || lastSeen === '{}';

  const { isOpen, onClose, onOpen } = useDisclosure({
    defaultOpen,
  });

  // Need to sync atom because it's used in multiple places
  useEffect(() => {
    if (isOpen !== isOpenAtom) setIsOpenAtom(isOpen);
  }, [isOpen, isOpenAtom, setIsOpenAtom]);

  useEffect(() => {
    if (current !== lastSeen) {
      onOpen();
      localStorage.setItem(LS_KEY, current);
    }
  }, [current, lastSeen, onOpen]);

  const handleClose = () => {
    onClose();
    localStorage.setItem(LS_KEY, current);
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
                    We&#39;ve upgraded JobStash with new features to make your
                    experience faster and easier.
                  </ContentText>

                  <div className="flex flex-col gap-2 pl-2">
                    <ContentText className="font-bold">
                      Improved Login Options:
                    </ContentText>
                    <ul className="pl-6 space-y-1 list-disc list-outside">
                      <li>
                        <ContentText>
                          Log in with your wallet, Google account, Farcaster,
                          and more, thanks to our integration with Privy.
                        </ContentText>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2 pl-2">
                    <ContentText className="font-bold">
                      Job Promotion Made Easy:
                    </ContentText>
                    <ul className="pl-6 space-y-1 list-disc list-outside">
                      <li>
                        <ContentText>
                          Promote jobs permissionlessly with LlamaPay, no
                          account needed.
                        </ContentText>
                      </li>
                      <li>
                        <ContentText>
                          <span className="font-bold">October Special:</span>{' '}
                          75% off basic job promotions—feature your listing on
                          the homepage!
                        </ContentText>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2 pl-2">
                    <ContentText className="font-bold">
                      Enhanced Profiles:
                    </ContentText>
                    <ul className="pl-6 space-y-1 list-disc list-outside">
                      <li>
                        <ContentText>
                          Streamlined profiles and filters, with clear
                          indications of EXPERT status and organization
                          affiliations.
                        </ContentText>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex items-center justify-center gap-4 p-0 pt-2">
              <div>
                <span className="text-md text-white/80">
                  Found any bugs? Let us know at{' '}
                  <Link
                    href={SUPPORT_TELEGRAM_URL}
                    className="text-indigo-400 hover:underline"
                  >
                    {' '}
                    @jobstashxyz
                  </Link>
                </span>
              </div>
              {/* {hasCTA && (
                <Button
                  size="md"
                  className="font-bold md:w-1/5 bg-gradient-to-l from-primary to-tertiary"
                  onClick={onClickCTA}
                >
                  {CTA_TEXT}
                </Button>
              )}
              <Button
                size="md"
                className="font-bold md:w-1/5"
                onClick={onClose}
              >
                OK
              </Button> */}
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
