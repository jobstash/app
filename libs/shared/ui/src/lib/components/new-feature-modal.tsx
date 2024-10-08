import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
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
const CTA_TEXT = 'To reviews..';
const CTA_LINK = '/organizations';

export const NewFeatureModal = () => {
  const router = useRouter();
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

  const hasCTA = CTA_TEXT && CTA_LINK;
  const onClickCTA = () => {
    if (hasCTA) {
      handleClose();
      router.push(CTA_LINK);
    }
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
      <ModalContent className="md:gap-y-4 overflow-x-hidden">
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
                  <span className="leading-tight text-lg sm:text-3xl md:text-2xl lg:text-4xl font-bold text-center shrink-0">
                    {TITLE}
                  </span>
                  <span role="img" aria-label="Shimmer">
                    🔥
                  </span>
                </div>

                <div className="max-w-fit flex flex-col gap-4">
                  <ContentText>
                    We&#39;ve upgraded JobStash with new features and a seamless
                    login experience to make things faster and easier for you.
                  </ContentText>

                  <div className="pl-2 flex flex-col gap-2">
                    <ContentText className="font-bold">
                      Improved Login Options:
                    </ContentText>
                    <ul className="space-y-1 list-disc list-outside pl-6">
                      <li>
                        <ContentText>
                          Sick and tired of SIWE logins bugging out? Well,
                          we&#39;ve integrated Privy, so now you can log in with
                          your wallet, google account, farcaster, and a few
                          others.
                        </ContentText>
                      </li>
                    </ul>
                  </div>

                  <div className="pl-2 flex flex-col gap-2">
                    <ContentText className="font-bold">
                      Job Promotion Made Easy:
                    </ContentText>
                    <ul className="space-y-1 list-disc list-outside pl-6">
                      <li>
                        <ContentText>
                          We revamped our job promotion mechanism, and
                          integrated payments via LlamaPay, so now anyone can
                          promote a job permissionlessly without creating an
                          account.
                        </ContentText>
                      </li>
                      <li>
                        <ContentText>
                          <span className="font-bold">October Special</span>:
                          75% off basic job promotions – bump your listing to
                          the top and feature it on the homepage!
                        </ContentText>
                      </li>
                    </ul>
                  </div>

                  <div className="pl-2 flex flex-col gap-2">
                    <ContentText className="font-bold">
                      Enhanced Profiles:
                    </ContentText>
                    <ul className="space-y-1 list-disc list-outside pl-6">
                      <li>
                        <ContentText>
                          We&#39;ve revamped profiles, streamlined filters, and
                          made it clear which accounts earn{' '}
                          <span className="font-bold">EXPERT</span> status and
                          organization affiliation.
                        </ContentText>
                      </li>
                    </ul>
                  </div>
                  {/* 
                  <div className="pt-4">
                    <ContentText>
                      Found any bugs? Let us know at @jobstashxyz
                    </ContentText>
                  </div> */}
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex items-center gap-4 justify-center p-0 pt-2">
              <div>
                <span className="text-md text-white/80">
                  Found any bugs? Let us know at{' '}
                  <Link
                    href={SUPPORT_TELEGRAM_URL}
                    className="hover:underline text-indigo-400"
                  >
                    {' '}
                    @jobstashxyz
                  </Link>
                </span>
              </div>
              {/* {hasCTA && (
                <Button
                  size="md"
                  className="md:w-1/5 bg-gradient-to-l from-primary to-tertiary font-bold"
                  onClick={onClickCTA}
                >
                  {CTA_TEXT}
                </Button>
              )}
              <Button
                size="md"
                className="md:w-1/5 font-bold"
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
